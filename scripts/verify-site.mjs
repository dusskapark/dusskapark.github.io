#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  articleHtml,
  collectParityErrors,
  decodeEntities,
  elements,
  exists,
  linkUrls,
  localAssetPath,
  normalizeText,
  normalizeUrl,
  pageMetadata,
  readBaseline,
  resourceUrls,
  tags,
} from "../tests/helpers/site-audit.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const option = (name) =>
  args.includes(name) ? args[args.indexOf(name) + 1] : undefined;
const baseUrl = new URL(
  option("--url") ||
    args.find((arg) => /^https?:\/\//.test(arg)) ||
    process.env.SITE_CHECK_URL ||
    "http://127.0.0.1:3000",
);
const baseline = await readBaseline(root);
const failures = [];
const warnings = [];
const pages = new Map();
const requestCache = new Map();
const counts = {
  pages: 0,
  contentRoutes: 0,
  galleries: 0,
  originalMedia: 0,
  originalLinks: 0,
  captions: 0,
  proseExcerpts: 0,
  codeBlocks: 0,
  redirects: 0,
  internalLinks: 0,
  assets: 0,
  notFound: 0,
};

function check(condition, message) {
  if (!condition) failures.push(message);
}
async function request(path, method = "GET") {
  const key = `${method} ${path}`;
  if (!requestCache.has(key))
    requestCache.set(
      key,
      (async () => {
        try {
          const response = await fetch(new URL(path, baseUrl), {
            method,
            redirect: "manual",
            signal: AbortSignal.timeout(60000),
          });
          return {
            status: response.status,
            headers: response.headers,
            body: method === "HEAD" ? "" : await response.text(),
          };
        } catch (error) {
          failures.push(`${path}: request failed (${error.message})`);
          return { status: 0, headers: new Headers(), body: "" };
        }
      })(),
    );
  return requestCache.get(key);
}

async function inBatches(items, work, limit = 3) {
  for (let index = 0; index < items.length; index += limit)
    await Promise.all(items.slice(index, index + limit).map(work));
}

function canonicalPath(value) {
  try {
    return new URL(value).pathname;
  } catch {
    return undefined;
  }
}

function commonPageChecks(path, html) {
  const metadata = pageMetadata(html);
  check(metadata.title.length > 0, `${path}: missing page title`);
  check(
    !/<\/?(?:br|[^>]+)>/i.test(metadata.title),
    `${path}: HTML leaked into the page title`,
  );
  check(
    metadata.values.get("description")?.trim().length > 0,
    `${path}: missing description`,
  );
  let canonicalMatches = false;
  try {
    canonicalMatches =
      new URL(metadata.canonical).href ===
      new URL(`https://api.metadata.co.kr${path}`).href;
  } catch {
    /* Missing or invalid canonical is reported below. */
  }
  check(
    canonicalMatches,
    `${path}: incorrect canonical ${metadata.canonical || "(missing)"}`,
  );
  for (const property of [
    "og:title",
    "og:description",
    "og:image",
    "twitter:card",
    "twitter:title",
    "twitter:description",
    "twitter:image",
  ]) {
    check(
      metadata.values.get(property)?.trim().length > 0,
      `${path}: missing ${property}`,
    );
  }
  check(
    tags(html, "main").filter((tag) => tag.id === "main").length === 1,
    `${path}: expected one main landmark with the skip-link target`,
  );
  check(tags(html, "h1").length === 1, `${path}: expected one h1`);
  check(
    tags(html, "a").some((tag) => tag.href === "#main"),
    `${path}: missing skip link`,
  );
  check(
    tags(html, "form").length === 0,
    `${path}: contact form remains despite email-only scope`,
  );
  check(
    !tags(html, "script").some((tag) =>
      /(?:jquery|made-min|plugins\/(?:history|owl|fluidbox|masonry|waypoints))/.test(
        tag.src || "",
      ),
    ),
    `${path}: legacy global JavaScript is loaded`,
  );
  for (const frame of tags(html, "iframe")) {
    check(
      frame.title?.trim().length > 0,
      `${path}: iframe has no accessible title (${frame.src})`,
    );
    check(
      frame.loading === "lazy",
      `${path}: iframe is not lazy loaded (${frame.src})`,
    );
  }
  for (const video of tags(html, "video")) {
    check(
      "controls" in video,
      `${path}: local video has no native controls (${video.src})`,
    );
    check(
      ["none", "metadata"].includes(video.preload),
      `${path}: local video preloads too much data (${video.src})`,
    );
  }
  for (const link of tags(html, "a").filter((tag) => tag.target === "_blank")) {
    check(
      /(?:^|\s)(?:noopener|noreferrer)(?:\s|$)/.test(link.rel || ""),
      `${path}: new-tab link has no safe rel (${link.href})`,
    );
  }
  return metadata;
}

console.log(`Checking rendered site at ${baseUrl.origin}`);
for (const path of ["/", "/projects", "/blog", "/about"]) {
  const response = await request(path);
  check(
    response.status === 200,
    `${path}: expected 200, received ${response.status}`,
  );
  if (response.status === 200) {
    pages.set(path, response.body);
    counts.pages++;
    commonPageChecks(path, response.body);
  }
}

await inBatches(baseline.items, async (entry) => {
  const response = await request(entry.route);
  check(
    response.status === 200,
    `${entry.route}: expected 200, received ${response.status}`,
  );
  if (response.status !== 200) return;
  const html = response.body;
  pages.set(entry.route, html);
  counts.pages++;
  counts.contentRoutes++;
  counts.galleries += entry.galleries.length;
  counts.originalMedia += entry.resources.length;
  counts.originalLinks += entry.links.length;
  counts.captions += entry.captions.length;
  counts.proseExcerpts += entry.paragraphs.length;
  counts.codeBlocks += entry.codeBlocks?.length ?? 0;
  const metadata = commonPageChecks(entry.route, html);
  check(
    normalizeText(metadata.title).includes(entry.title),
    `${entry.route}: original title missing from document title`,
  );
  check(
    elements(html, "h1").some((heading) => heading.text === entry.title),
    `${entry.route}: original h1 title changed`,
  );
  check(
    normalizeText(metadata.values.get("description")) === entry.description,
    `${entry.route}: description changed`,
  );
  check(
    normalizeUrl(metadata.values.get("og:image"), entry.route) === entry.hero,
    `${entry.route}: incorrect OG image`,
  );
  check(
    normalizeUrl(metadata.values.get("twitter:image"), entry.route) ===
      entry.hero,
    `${entry.route}: incorrect Twitter image`,
  );
  check(
    tags(html, "article").some((tag) => tag.lang === entry.lang),
    `${entry.route}: missing article lang=${entry.lang}`,
  );
  check(
    metadata.values.get("og:locale") ===
      (entry.lang === "ko" ? "ko_KR" : "en_US"),
    `${entry.route}: incorrect Open Graph locale`,
  );
  const structuredData = [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([^]*?)<\/script>/g,
    ),
  ];
  check(
    structuredData.length > 0,
    `${entry.route}: article structured data is missing`,
  );
  for (const [, raw] of structuredData) {
    try {
      const data = JSON.parse(raw);
      check(
        normalizeText(data.headline) === entry.title &&
          data.inLanguage === entry.lang,
        `${entry.route}: incorrect article structured data`,
      );
    } catch {
      failures.push(`${entry.route}: invalid article structured data JSON`);
    }
  }
  failures.push(...collectParityErrors(entry, html));
  for (const productId of entry.storeIds)
    check(
      linkUrls(html, entry.route).some((href) => href.includes(productId)),
      `${entry.route}: missing store link for ${productId}`,
    );
  for (const image of tags(articleHtml(html), "img")) {
    check(
      Boolean(image.alt?.trim()) ||
        image["aria-hidden"] === "true" ||
        image.role === "presentation",
      `${entry.route}: meaningful image lacks alt (${image.src})`,
    );
    const source = resourceUrls(`<img src="${image.src}">`, entry.route)[0];
    if (source?.startsWith("/images/") && !/\.svg(?:[?#]|$)/i.test(source)) {
      check(
        Number(image.width) > 0 && Number(image.height) > 0,
        `${entry.route}: local image lacks dimensions (${source})`,
      );
    }
  }
  if (entry.slug.startsWith("mcp-magic-retrospective")) {
    const alternatives = tags(html, "link").filter(
      (tag) => tag.rel === "alternate",
    );
    check(
      alternatives.some(
        (tag) =>
          tag.hreflang === "en" &&
          canonicalPath(tag.href) === "/blog/mcp-magic-retrospective-en",
      ),
      `${entry.route}: English translation metadata missing`,
    );
    check(
      alternatives.some(
        (tag) =>
          tag.hreflang === "ko" &&
          canonicalPath(tag.href) === "/blog/mcp-magic-retrospective",
      ),
      `${entry.route}: Korean translation metadata missing`,
    );
  }
});

const projectArchiveLinks = new Set(
  linkUrls(pages.get("/projects") || "", "/projects"),
);
const postArchiveLinks = new Set(linkUrls(pages.get("/blog") || "", "/blog"));
for (const entry of baseline.items) {
  const links =
    entry.kind === "project" ? projectArchiveLinks : postArchiveLinks;
  check(
    links.has(entry.route) === entry.listed,
    `${entry.route}: incorrect archive visibility`,
  );
}
check(
  [...pages.values()].some((html) =>
    linkUrls(html).includes("mailto:dusskapark@gmail.com"),
  ),
  "The direct contact email is missing",
);
check(
  tags(pages.get("/") || "", "section").some((tag) => tag.id === "contact") ||
    tags(pages.get("/") || "", "footer").some((tag) => tag.id === "contact") ||
    tags(pages.get("/") || "", "div").some((tag) => tag.id === "contact"),
  "/: contact anchor target is missing",
);

const aliases = [
  ["/index.html", "/"],
  ["/blog/index.html", "/blog"],
  ["/thanks", "/#contact"],
  ["/thanks.html", "/#contact"],
  ...baseline.items.flatMap((entry) => [
    [`${entry.route}.html`, entry.route],
    [`${entry.route}/`, entry.route],
  ]),
];
await inBatches(aliases, async ([from, to]) => {
  const response = await request(from);
  check(
    [301, 308].includes(response.status),
    `${from}: expected permanent redirect, received ${response.status}`,
  );
  const location = response.headers.get("location");
  check(
    location !== null &&
      new URL(location, baseUrl).pathname + new URL(location, baseUrl).hash ===
        to,
    `${from}: expected ${to}, received ${location}`,
  );
  counts.redirects++;
});

const localLinks = new Set();
const localAssets = new Set();
const actualAssetUrls = new Set();
const stylesheets = new Set();
for (const [path, html] of pages) {
  for (const url of [...linkUrls(html, path), ...resourceUrls(html, path)]) {
    if (!url.startsWith("/")) continue;
    if (localAssetPath(url, resolve(root, "public")))
      localAssets.add(url.split(/[?#]/, 1)[0]);
    else localLinks.add(url);
  }
  for (const tag of [
    ...tags(html, "a"),
    ...tags(html, "img"),
    ...tags(html, "video"),
    ...tags(html, "source"),
  ]) {
    const value = tag.href || tag.src;
    if (!value) continue;
    const resolved = new URL(value, new URL(path, baseUrl));
    if (
      resolved.origin === baseUrl.origin &&
      localAssetPath(normalizeUrl(resolved.pathname))
    )
      actualAssetUrls.add(resolved.pathname + resolved.search);
  }
  for (const link of tags(html, "link")) {
    if (link.rel === "stylesheet" && link.href?.startsWith("/"))
      stylesheets.add(link.href);
  }
  for (const property of ["og:image", "twitter:image"]) {
    const asset = normalizeUrl(pageMetadata(html).values.get(property));
    if (asset.startsWith("/")) localAssets.add(asset.split(/[?#]/, 1)[0]);
  }
}

await inBatches([...localLinks], async (href) => {
  const url = new URL(href, baseUrl);
  const path = decodeURIComponent(url.pathname);
  let html = pages.get(path);
  if (!html) {
    const response = await request(path);
    check(
      [200, 301, 308].includes(response.status),
      `${href}: broken internal link (${response.status})`,
    );
    html = response.status === 200 ? response.body : undefined;
  }
  if (url.hash && html) {
    const id = decodeURIComponent(url.hash.slice(1));
    const targets = new Set(
      [...tags(html, "[a-z][a-z0-9:-]*")].map((tag) => tag.id).filter(Boolean),
    );
    check(targets.has(id), `${href}: fragment target is missing`);
  }
  counts.internalLinks++;
});

await inBatches(
  [...localAssets],
  async (asset) => {
    const file = localAssetPath(asset, resolve(root, "public"));
    if (file) check(await exists(file), `${asset}: missing public asset file`);
    const response = await request(
      asset.split("/").map(encodeURIComponent).join("/"),
      "HEAD",
    );
    check(
      response.status === 200,
      `${asset}: expected 200, received ${response.status}`,
    );
    check(
      !response.headers.get("content-type")?.includes("text/html"),
      `${asset}: asset route returned HTML`,
    );
    counts.assets++;
  },
  5,
);

await inBatches(
  [...actualAssetUrls],
  async (asset) => {
    const response = await request(asset, "HEAD");
    check(
      response.status === 200,
      `${asset}: rendered original asset URL returns ${response.status}`,
    );
  },
  5,
);

for (const path of [
  "/blog/demo",
  "/project/test",
  "/_projects/test.md",
  "/research/mcp-magic-retrospective/ga4/talk-to-figma-desktop-ga4-raw-data.csv",
  "/content/posts/mcp-magic-retrospective.mdx",
  "/unavailable-qa-route",
]) {
  const response = await request(path);
  check(
    response.status === 404,
    `${path}: expected 404, received ${response.status}`,
  );
  counts.notFound++;
}

const sitemap = await request("/sitemap.xml");
check(sitemap.status === 200, "/sitemap.xml: expected 200");
const sitemapUrls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => decodeEntities(match[1]),
);
for (const path of pages.keys())
  check(
    sitemapUrls.includes(`https://api.metadata.co.kr${path}`),
    `/sitemap.xml: missing ${path}`,
  );
check(
  !sitemapUrls.some((url) =>
    /\/(?:research|blog\/demo|project\/test|thanks)(?:\/|$|\.)/.test(url),
  ),
  "/sitemap.xml: excluded content is published",
);
const robots = await request("/robots.txt");
check(
  robots.status === 200 &&
    robots.body.includes("https://api.metadata.co.kr/sitemap.xml"),
  "/robots.txt: sitemap declaration missing",
);

let css = "";
for (const path of stylesheets) {
  const response = await request(path);
  check(response.status === 200, `${path}: missing stylesheet`);
  css += response.body;
}
check(
  /prefers-reduced-motion\s*:\s*reduce/.test(css),
  "No reduced-motion stylesheet rule was served",
);
if (/html[^{}]*\{[^}]*scroll-behavior\s*:\s*smooth/.test(css)) {
  for (const [path, html] of pages)
    check(
      tags(html, "html")[0]?.["data-scroll-behavior"] === "smooth",
      `${path}: Next cannot disable smooth scrolling during route transitions without data-scroll-behavior="smooth"`,
    );
}
warnings.push(
  "External destinations are checked for preservation; their third-party availability is not tested.",
);
warnings.push(
  "No-JavaScript checks inspect server HTML. Browser motion preference and interactive behavior need the separate CUA walkthrough.",
);

const report = {
  baseUrl: baseUrl.origin,
  checkedAt: new Date().toISOString(),
  counts,
  failures,
  warnings,
};
if (option("--report"))
  await writeFile(
    resolve(root, option("--report")),
    JSON.stringify(report, null, 2) + "\n",
  );
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
