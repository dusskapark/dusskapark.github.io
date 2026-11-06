import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { load } from "cheerio";
import { normalizeText, normalizeUrl, readBaseline } from "./helpers/site-audit.mjs";

const baseline = await readBaseline();
const variants = JSON.parse(await readFile("content/image-variants.json", "utf8"));
const originalImages = new Map(
  Object.entries(variants).flatMap(([original, entry]) =>
    entry.variants.map(({ src }) => [normalizeUrl(src), normalizeUrl(original)]),
  ),
);

// These replacements are deliberately exact and must themselves remain visible.
// 3bde4e8b corrected a stale shipping prediction and changed the callout to an aside.
// 692ad22a replaced reference cards with link previews and an unavailable GIF
// with a repository fallback; it also renamed the two download-card headings.
const replacements = {
  "/project/naver-now": {
    paragraph: [[
      "We successfully finalized the development of this new carousel component and it will be shipped on Aug. 2022 (expected). There's certainly a lot that could be improved. I believe in learning and iterating by shipping often and early.",
      "We successfully finalized the development of this new carousel component and it was scheduled to ship in August 2022. There's certainly a lot that could be improved. I believe in learning and iterating by shipping often and early.",
    ]],
  },
  "/project/figma-autoname": {
    headingAsText: ["Before Figma AI's 'Rename layers' feature took center stage, an open-source initiative was breaking new ground. What inspired me to inject my AI prowess into this venture, and what impact could it have on the Figma design ecosystem?"],
    // The same review replaced logo-bearing buttons with text ButtonLinks.
    mediaLink: [
      ["https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", "https://www.figma.com/community/plugin/1160642826057169962/figma-autoname"],
      ["https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg", "https://github.com/FigmaAI/figma-dummy-gen/blob/main/classification.ipynb"],
    ],
  },
  "/project/klever": {
    mediaLink: [["https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", "https://github.com/FigmaAI/klever"]],
  },
  "/project/how-far-can-a-product-designer-build-with-codex": {
    heading: [["Live Rider app", "Rider app"], ["Live Driver app", "Driver app"]],
  },
  "/project/talk-to-figma-mcp": {
    // The preview's destination, rather than third-party preview copy, is the invariant.
    paragraphLink: [
      ["cursor-talk-to-figma-mcp: Multiple plugins into one AI system", "https://github.com/grab/cursor-talk-to-figma-mcp"],
      ["TalkToFigma Desktop: Desktop app accessible to all designers", "https://github.com/FigmaAI/TalkToFigmaDesktop"],
      ["Workshop Playground (EN): Design Automation with Figma MCP", "https://www.figma.com/community/file/1513760524697897204"],
      ["Workshop Materials (KR): MCP Design Automation Workshop Materials", "https://www.figma.com/community/file/1513759391089024242"],
    ],
    mediaLink: [
      ["https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", "https://github.com/grab/cursor-talk-to-figma-mcp"],
      ["https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", "https://github.com/grab/cursor-talk-to-figma-mcp"],
      ["https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", "https://www.figma.com/community/file/1513760524697897204"],
    ],
  },
};

const unavailableCaption = "Prototype of the Figma plugin via integrating with Python Flask server approach (Code)";
const unavailableImage = "https://github.com/FigmaAI/AppAgent/blob/main/assets/KleverOnServer.gif?raw=true";

function inspect(entry, html) {
  const $ = load(html);
  const body = $("article .content-body");
  if (body.length !== 1) return [`expected one article content body, found ${body.length}`];
  // Only rendered article content counts; scripts, styles, templates and hidden
  // nodes must not satisfy an assertion through hydration or metadata payloads.
  body.find("script, style, template, [hidden]").remove();
  body.find("br").replaceWith(" ");
  body.find("p, div, section, article, aside, blockquote, figure, figcaption, h1, h2, h3, h4, h5, h6, li, pre").prepend(" ").append(" ");
  const text = normalizeText(body.text());
  const headings = body.find("h2, h3, h4, h5, h6").toArray().map((el) => normalizeText($(el).text()));
  const captions = body.find("figcaption, [class*='caption']").toArray().map((el) => normalizeText($(el).text()));
  const code = body.find("pre").toArray().map((el) => normalizeText($(el).text()));
  const links = new Set(body.find("a[href]").toArray().map((el) => normalizeUrl($(el).attr("href"), entry.route)));
  const media = new Set(body.find("img[src], iframe[src], video[src], video[poster], source[src], a[href]").toArray().flatMap((el) =>
    ["src", "poster", "href"].map((attr) => $(el).attr(attr)).filter(Boolean).map((value) => {
      const url = normalizeUrl(value, entry.route);
      return originalImages.get(url) ?? url;
    }),
  ));
  const replacement = replacements[entry.route] ?? {};
  const fallback = entry.route === "/project/klever" && body.find(".content-media-unavailable").toArray().some((el) =>
    normalizeText($(el).text()).includes("The prototype animation is no longer available at its original location.") &&
    $(el).find('a[href="https://github.com/FigmaAI/AppAgent"]').length > 0,
  );
  const errors = [];
  for (const paragraph of entry.paragraphs) {
    const edit = replacement.paragraph?.find(([before]) => before === paragraph);
    const card = replacement.paragraphLink?.find(([before]) => before === paragraph);
    if (!text.includes(paragraph) && !(edit && text.includes(edit[1])) &&
        !(card && links.has(normalizeUrl(card[1], entry.route))) &&
        !(paragraph === unavailableCaption && fallback)) errors.push(`paragraph: ${paragraph}`);
  }
  for (const heading of entry.headings) {
    const edit = replacement.heading?.find(([before]) => before === heading);
    if (!headings.includes(heading) && !(edit && headings.includes(edit[1])) &&
        !(replacement.headingAsText?.includes(heading) && text.includes(heading))) errors.push(`heading: ${heading}`);
  }
  for (const caption of entry.captions) {
    if (!captions.some((value) => value.includes(caption)) && !(caption === unavailableCaption && fallback)) errors.push(`caption: ${caption}`);
  }
  for (const url of entry.links) if (!links.has(url)) errors.push(`link: ${url}`);
  for (const block of entry.codeBlocks ?? []) if (!code.some((value) => value.includes(block))) errors.push(`code block: ${block}`);
  for (const url of entry.resources) {
    // The reviewed click-to-play facade uses a local thumbnail of the same
    // YouTube ID instead of an iframe or img.youtube.com thumbnail (3bde4e8b).
    // This only verifies the static thumbnail, not the interactive video URL.
    const video = url.match(/^https:\/\/(?:www\.youtube\.com\/embed|img\.youtube\.com\/vi)\/([\w-]{11})(?:[/?]|$)/);
    const thumbnail = video && body.find(".hero-video button img[src]").toArray().some((el) => {
      const src = normalizeUrl($(el).attr("src"), entry.route);
      const original = originalImages.get(src) ?? src;
      return original === `/images/video-thumbnails/${video[1]}.jpg` || original === `/images/video-thumbnails/${video[1]}.webp`;
    });
    // 3bde4e8b replaced the upstream Form Helper demo with a local copy.
    const localDemo = entry.route === "/project/form-helper-chrome" && url === "https://github.com/dusskapark/form-helper-chrome-playground/raw/master/demo.gif" && media.has("/images/projects/2024-form-helper-chrome/demo.gif");
    const card = replacement.mediaLink?.find(([before]) => before === url);
    if (!media.has(url) && !thumbnail && !localDemo && !(card && links.has(normalizeUrl(card[1], entry.route))) && !(url === unavailableImage && fallback)) errors.push(`media: ${url}`);
  }
  return errors;
}

test("baseline is an independent nonempty Jekyll content inventory", () => {
  assert.match(baseline.source, /Jekyll/);
  assert.equal(baseline.items.length, 20);
  for (const field of ["paragraphs", "headings", "links", "captions", "codeBlocks", "resources"]) {
    assert.ok(baseline.items.reduce((count, item) => count + item[field].length, 0) > 0, `empty ${field} inventory`);
  }
  assert.equal(new Set(baseline.items.map(({ route }) => route)).size, baseline.items.length);
});

test("DOM audit cannot be satisfied by scripts, templates or hidden content", () => {
  const entry = { route: "/project/example", paragraphs: ["visible prose"], headings: [], captions: [], codeBlocks: [], resources: [], links: ["https://example.com/"] };
  const html = '<article><div class="content-body"><script>visible prose <a href="https://example.com/">x</a></script><template>visible prose <a href="https://example.com/">x</a></template><span hidden>visible prose <a href="https://example.com/">x</a></span></div></article>';
  assert.deepEqual(inspect(entry, html), ["paragraph: visible prose", "link: https://example.com/"]);
});

test("DOM audit detects missing prose, heading, caption, code and media independently", () => {
  const entry = { route: "/project/example", paragraphs: ["unique paragraph"], headings: ["unique heading"], captions: ["unique caption"], codeBlocks: ["const value = 1;"], resources: ["/images/example.png"], links: ["https://example.com/"] };
  const html = '<article><div class="content-body"><h2>unique heading</h2><p>unique paragraph</p><figure><img src="/images/example.png"><figcaption>unique caption</figcaption></figure><pre><code>const value = 1;</code></pre><a href="https://example.com/">link</a></div></article>';
  assert.deepEqual(inspect(entry, html), []);
  for (const [original, changed, expected] of [
    ["unique paragraph", "changed paragraph", "paragraph:"],
    ["unique heading", "changed heading", "heading:"],
    ["unique caption", "changed caption", "caption:"],
    ["const value = 1;", "const value = 2;", "code block:"],
    ["/images/example.png", "/images/other.png", "media:"],
    ["https://example.com/", "https://other.example/", "link:"],
  ]) {
    assert.ok(inspect(entry, html.replace(original, changed)).some((error) => error.startsWith(expected)), expected);
  }
});

for (const entry of baseline.items) {
  test(`${entry.route}: Jekyll content survives in static HTML`, async () => {
    const html = await readFile(`dist${entry.route}.html`, "utf8");
    const errors = inspect(entry, html);
    assert.deepEqual(errors, [], `${entry.route}:\n${errors.join("\n")}`);
  });
}
