import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import {
  normalizeText,
  normalizeUrl,
  readBaseline,
  collectParityErrors,
  resourceUrls,
} from "./helpers/site-audit.mjs";

const baseline = await readBaseline();
const imageVariants = JSON.parse(await readFile("content/image-variants.json", "utf8"));
// Load the same JSX modules and component registry used by the app, not a
// second parser or a reconstructed copy of the metadata.
const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
  esbuild: { jsx: "automatic" },
  optimizeDeps: { noDiscovery: true, include: [] },
  resolve: { alias: { "@": resolve("src"), "react-router-dom": resolve("node_modules/react-router-dom/dist/index.mjs") } },
  ssr: { noExternal: ["react-tweet"] },
});
test.after(async () => vite.close());
const expectedProjectSlugs = [
  "bobplanet",
  "chatbot",
  "figma-autoname",
  "form-helper-chrome",
  "gdc",
  "how-far-can-a-product-designer-build-with-codex",
  "klever",
  "ldsg",
  "lgd-project",
  "liff-project",
  "lookbook",
  "naver-now",
  "onestore",
  "orderbook",
  "talk-to-figma-mcp",
  "tensorflow-js",
  "tstore",
].sort();
const expectedPostSlugs = [
  "machine-learning-for-design-systems",
  "mcp-magic-retrospective",
  "mcp-magic-retrospective-en",
].sort();

async function contentModule(entry) {
  const folder = entry.kind === "project" ? "projects" : "posts";
  return vite.ssrLoadModule(`/content/${folder}/${entry.slug}.jsx`);
}

async function renderedBody(entry) {
  const { default: Body } = await contentModule(entry);
  assert.equal(typeof Body, "function", `${entry.route} body component`);
  return renderToStaticMarkup(createElement(Body));
}

test("keeps the 17 project routes and three non-demo writing routes", async () => {
  const projectFiles = await readdir("content/projects");
  const postFiles = await readdir("content/posts");
  assert.deepEqual([...projectFiles, ...postFiles].filter((file) => file.endsWith(".mdx")), [], "legacy MDX files must not remain in content folders");
  const projects = projectFiles
    .filter((file) => file.endsWith(".jsx"))
    .map((file) => file.slice(0, -4))
    .sort();
  const posts = postFiles
    .filter((file) => file.endsWith(".jsx"))
    .map((file) => file.slice(0, -4))
    .sort();
  for (const slug of expectedProjectSlugs) assert.ok(projects.includes(slug), `Missing migrated project: ${slug}`);
  for (const slug of expectedPostSlugs) assert.ok(posts.includes(slug), `Missing migrated post: ${slug}`);
  assert.equal(
    baseline.items.reduce((total, entry) => total + entry.galleries.length, 0),
    50,
  );
});

test("preserves original titles, descriptions, media heroes, languages, and archive visibility", async () => {
  for (const entry of baseline.items) {
    const { frontmatter: data } = await contentModule(entry);
    assert.ok(data, `${entry.route} named frontmatter export`);
    assert.equal(data.slug, entry.slug, entry.route);
    assert.equal(data.kind, entry.kind, entry.route);
    assert.equal(
      normalizeText(data.title),
      entry.title,
      `${entry.route} title`,
    );
    assert.equal(
      normalizeText(data.description),
      entry.description,
      `${entry.route} description`,
    );
    assert.equal(
      normalizeUrl(data.hero, entry.route),
      entry.hero,
      `${entry.route} hero`,
    );
    // The later content review corrected Bobplanet's Korean language metadata.
    assert.equal(data.lang, entry.slug === "bobplanet" ? "ko" : entry.lang, `${entry.route} language`);
    assert.equal(data.listed, entry.listed, `${entry.route} visibility`);
    assert.ok(
      data.legacyPaths.includes(`${entry.route}.html`),
      `${entry.route} legacy .html URL`,
    );
    assert.ok(
      data.legacyPaths.includes(`${entry.route}/`),
      `${entry.route} legacy trailing slash URL`,
    );
  }
});

test("preserves every gallery grouping, image order, and column count from the original documents", async () => {
  for (const entry of baseline.items) {
    const html = await renderedBody(entry);
    const $ = load(html);
    const galleries = $("figure.content-gallery").toArray().map((figure) => ({
      columns: Number($(figure).attr("data-columns")),
      images: $(figure).find("a.content-gallery-image-link").toArray().map((image) =>
        normalizeUrl($(image).attr("href"), entry.route),
      ),
    }));
    const expected = entry.galleries.map(({ columns, images }) => ({ columns, images }));
    // The 2026 content review replaced these galleries with accessible media or
    // an explicit fallback for a removed upstream image; keep testing those replacements.
    if (entry.slug === "tensorflow-js") {
      for (const id of ["ckN1QIpjkAk", "blL0EQ6wNH8"]) {
        assert.ok($(`a[href="https://www.youtube.com/watch?v=${id}"]`).length, `${entry.route} video ${id}`);
      }
      const source = "/images/projects/2021-made-with-tfjs/2022-01-02 11.54.33.png";
      const variants = imageVariants[source].variants.map((variant) => variant.src);
      assert.ok($("img").toArray().some((img) => variants.includes($(img).attr("src"))), `${entry.route} presentation image`);
      expected.splice(0, 1);
    }
    if (entry.slug === "form-helper-chrome") {
      const source = "/images/projects/2024-form-helper-chrome/demo.gif";
      const variants = imageVariants[source].variants.map((variant) => variant.src);
      assert.ok($("img").toArray().some((img) => variants.includes($(img).attr("src"))), `${entry.route} replacement demo`);
      expected.splice(0, 1);
    }
    if (entry.slug === "klever") {
      assert.match(html, /content-media-unavailable/);
      assert.match(html, /github\.com\/FigmaAI\/AppAgent/);
      expected.pop();
    }
    assert.deepEqual(galleries, expected, entry.route);
  }
});

test("the rendered audit ignores hydration payloads when checking no-JavaScript content", () => {
  const entry = {
    route: "/project/example",
    resources: ["/images/example.png"],
    links: [],
    headings: [],
    captions: [],
    paragraphs: [],
    galleries: [],
  };
  const html =
    '<article><p>Example</p></article><script>"<img src=\"/images/example.png\">"</script>';
  assert.deepEqual(collectParityErrors(entry, html), [
    "/project/example: missing media /images/example.png",
  ]);
});

test("the rendered audit recognizes original URLs served by Next image optimization", () => {
  assert.deepEqual(
    resourceUrls(
      '<img src="/_next/image?url=%2Fimages%2Fproject%20one.png&amp;w=1200&amp;q=75">',
    ),
    ["/images/project one.png"],
  );
});
