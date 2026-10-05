import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import {
  normalizeText,
  normalizeUrl,
  readBaseline,
  collectParityErrors,
  resourceUrls,
} from "./helpers/site-audit.mjs";

const baseline = await readBaseline();
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

async function migratedSource(entry) {
  return readFile(
    resolve(
      "content",
      entry.kind === "project" ? "projects" : "posts",
      `${entry.slug}.mdx`,
    ),
    "utf8",
  );
}

function frontMatter(source) {
  const raw = source.match(/^---\r?\n([^]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  assert.ok(raw, "MDX front matter is present");
  return JSON.parse(raw);
}

test("keeps the 17 project routes and three non-demo writing routes", async () => {
  const projects = (await readdir("content/projects"))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.slice(0, -4))
    .sort();
  const posts = (await readdir("content/posts"))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.slice(0, -4))
    .sort();
  assert.deepEqual(projects, expectedProjectSlugs);
  assert.deepEqual(posts, expectedPostSlugs);
  assert.equal(
    baseline.items.reduce((total, entry) => total + entry.galleries.length, 0),
    50,
  );
});

test("preserves original titles, descriptions, media heroes, languages, and archive visibility", async () => {
  for (const entry of baseline.items) {
    const data = frontMatter(await migratedSource(entry));
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
    assert.equal(data.lang, entry.lang, `${entry.route} language`);
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
    const source = await migratedSource(entry);
    const galleries = [
      ...source.matchAll(
        /<Gallery\s+images=\{(\[[^\n]*?\])\}\s+columns=\{(\d+)\}/g,
      ),
    ].map((match) => ({
      columns: Number(match[2]),
      images: JSON.parse(match[1]).map((image) =>
        normalizeUrl(image.src, entry.route),
      ),
    }));
    assert.deepEqual(
      galleries,
      entry.galleries.map(({ columns, images }) => ({ columns, images })),
      entry.route,
    );
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
