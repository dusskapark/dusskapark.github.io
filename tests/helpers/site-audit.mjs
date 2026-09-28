import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const namedEntities = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  lsquo: "'",
  rsquo: "'",
  ldquo: '"',
  rdquo: '"',
  ndash: "-",
  mdash: "-",
  hellip: "...",
  copy: "©",
  reg: "®",
  trade: "™",
  times: "×",
  middot: "·",
  rarr: "→",
  larr: "←",
  bull: "•",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
};

export function decodeEntities(value = "") {
  return String(value).replace(
    /&(#x[\da-f]+|#\d+|[a-z][\da-z]+);/gi,
    (entity, name) => {
      if (name[0] === "#") {
        const codePoint =
          name[1].toLowerCase() === "x"
            ? Number.parseInt(name.slice(2), 16)
            : Number.parseInt(name.slice(1), 10);
        return codePoint >= 0 && codePoint <= 0x10ffff
          ? String.fromCodePoint(codePoint)
          : entity;
      }
      return namedEntities[name.toLowerCase()] ?? entity;
    },
  );
}

export function normalizeText(value = "") {
  return decodeEntities(value)
    .normalize("NFC")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/\s+/g, " ")
    .trim();
}

export function stripInertHtml(html = "") {
  return html
    .replace(/<!--[^]*?-->/g, "")
    .replace(/<(script|style)\b[^>]*>[^]*?<\/\1\s*>/gi, "");
}

export function htmlText(html = "") {
  return normalizeText(
    stripInertHtml(html)
      .replace(
        /<br\b[^>]*>|<\/(?:p|li|h[1-6]|section|div|blockquote|pre|figcaption|tr|td)>/gi,
        " ",
      )
      .replace(/<[^>]+>/g, ""),
  );
}

export function attributes(tag) {
  const values = {};
  const opening = tag.replace(/^<\/?[\w:-]+\s*/, "").replace(/\/?\s*>$/, "");
  for (const match of opening.matchAll(
    /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g,
  )) {
    values[match[1].toLowerCase()] = decodeEntities(
      match[2] ?? match[3] ?? match[4] ?? "",
    );
  }
  return values;
}

export function tags(html, name) {
  const expression = new RegExp(`<${name}\\b[^>]*>`, "gi");
  const source =
    name === "script"
      ? html.replace(/<!--[^]*?-->/g, "")
      : stripInertHtml(html);
  return [...source.matchAll(expression)].map((match) => attributes(match[0]));
}

export function elements(html, name) {
  const expression = new RegExp(
    `<${name}\\b([^>]*)>([^]*?)<\\/${name}\\s*>`,
    "gi",
  );
  return [...stripInertHtml(html).matchAll(expression)].map((match) => ({
    attributes: attributes(`<${name}${match[1]}>`),
    html: match[2],
    text: htmlText(match[2]),
  }));
}

export function normalizeUrl(value, route = "/") {
  const raw = decodeEntities(value).trim();
  if (!raw) return "";
  if (/^(?:data|blob|mailto|tel|javascript):/i.test(raw)) return raw;
  try {
    const url = new URL(raw, `https://api.metadata.co.kr${route}`);
    const path = decodeURIComponent(url.pathname)
      .normalize("NFC")
      .replace(/\/{2,}/g, "/");
    return (
      (url.hostname === "api.metadata.co.kr"
        ? ""
        : `${url.protocol}//${url.host}`) +
      path +
      url.search +
      url.hash
    );
  } catch {
    return raw;
  }
}

export function resourceUrls(html, route = "/") {
  return [
    ...tags(html, "img"),
    ...tags(html, "iframe"),
    ...tags(html, "video"),
    ...tags(html, "source"),
  ]
    .flatMap((tag) => [tag.src, tag.poster].filter(Boolean))
    .map((value) => {
      const url = new URL(value, `https://api.metadata.co.kr${route}`);
      return normalizeUrl(
        url.pathname === "/_next/image"
          ? url.searchParams.get("url") || value
          : value,
        route,
      );
    });
}

export function linkUrls(html, route = "/") {
  return tags(html, "a")
    .map((tag) => normalizeUrl(tag.href, route))
    .filter(Boolean);
}

export function articleHtml(html) {
  return (
    elements(html, "article").find((article) =>
      /(?:post__content|case-study|prose|article-body|content-body)/.test(
        article.attributes.class ?? "",
      ),
    )?.html ??
    elements(html, "article")[0]?.html ??
    ""
  );
}

export function pageMetadata(html) {
  const metadata = new Map();
  for (const tag of tags(html, "meta")) {
    const key = tag.name || tag.property;
    if (key) metadata.set(key, tag.content ?? "");
  }
  const canonical = tags(html, "link").find(
    (tag) => tag.rel === "canonical",
  )?.href;
  return {
    title: elements(html, "title")[0]?.text ?? "",
    canonical,
    lang: tags(html, "html")[0]?.lang,
    values: metadata,
  };
}

export function localAssetPath(url, directory = "public") {
  if (
    !url.startsWith("/images/") &&
    !url.startsWith("/fonts/") &&
    !url.startsWith("/media/")
  )
    return null;
  return resolve(
    directory,
    decodeURIComponent(url.split(/[?#]/, 1)[0]).replace(/^\//, ""),
  );
}

export async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function readBaseline(root = process.cwd()) {
  return JSON.parse(
    await readFile(resolve(root, "tests/fixtures/legacy-content.json"), "utf8"),
  );
}

export function collectParityErrors(entry, html) {
  const errors = [];
  const body = articleHtml(html);
  if (!body) return [`${entry.route}: article body missing`];
  const renderedText = htmlText(body);
  const resources = new Set(resourceUrls(body, entry.route));
  const links = new Set(linkUrls(body, entry.route));
  const headings = [
    ...elements(body, "h2"),
    ...elements(body, "h3"),
    ...elements(body, "h4"),
    ...elements(body, "h5"),
    ...elements(body, "h6"),
  ].map((heading) => heading.text);
  for (const url of entry.resources) {
    if (!resources.has(url))
      errors.push(`${entry.route}: missing media ${url}`);
  }
  for (const url of entry.links) {
    if (!links.has(url)) errors.push(`${entry.route}: missing link ${url}`);
  }
  for (const heading of entry.headings) {
    if (!headings.includes(heading))
      errors.push(`${entry.route}: missing heading ${heading}`);
  }
  for (const text of [...entry.captions, ...entry.paragraphs]) {
    if (!renderedText.includes(text))
      errors.push(`${entry.route}: missing text ${text.slice(0, 120)}`);
  }
  const renderedCode = elements(body, "pre").map((block) => block.text);
  for (const code of entry.codeBlocks ?? []) {
    if (!renderedCode.some((block) => block.includes(code)))
      errors.push(
        `${entry.route}: original code sample changed ${code.slice(0, 100)}`,
      );
  }
  const galleries = tags(body, "figure").filter((tag) =>
    (tag.class ?? "").split(/\s+/).includes("content-gallery"),
  );
  const allGalleryRoots = galleries.length
    ? galleries
    : tags(body, "div").filter((tag) =>
        (tag.class ?? "").split(/\s+/).includes("content-gallery"),
      );
  if (allGalleryRoots.length !== entry.galleries.length) {
    errors.push(
      `${entry.route}: expected ${entry.galleries.length} galleries, found ${allGalleryRoots.length}`,
    );
  }
  const renderedGalleries = elements(body, "figure").filter((figure) =>
    (figure.attributes.class ?? "").split(/\s+/).includes("content-gallery"),
  );
  renderedGalleries.forEach((gallery, index) => {
    const original = entry.galleries[index];
    if (!original) return;
    const images = tags(gallery.html, "a")
      .filter((tag) =>
        (tag.class ?? "").split(/\s+/).includes("content-gallery-image-link"),
      )
      .map((tag) => normalizeUrl(tag.href, entry.route));
    if (Number(gallery.attributes["data-columns"]) !== original.columns) {
      errors.push(`${entry.route}: gallery ${index + 1} column count changed`);
    }
    if (JSON.stringify(images) !== JSON.stringify(original.images)) {
      errors.push(
        `${entry.route}: gallery ${index + 1} images or order changed in server HTML`,
      );
    }
  });
  return errors;
}
