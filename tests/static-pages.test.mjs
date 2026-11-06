import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { contentMetadata } from "../scripts/content-source.mjs";
import { load } from "cheerio";

const origin = "https://api.metadata.co.kr";

test("every content route has static canonical and social metadata", async () => {
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  for (const [folder, route] of [["projects", "project"], ["posts", "blog"]]) {
    const filenames = (await readdir(`content/${folder}`)).filter((name) => name.endsWith(".jsx"));
    assert.ok(filenames.length > 0, `No ${folder} content found`);
    for (const filename of filenames) {
      const data = contentMetadata(await readFile(`content/${folder}/${filename}`, "utf8"), filename);
      const url = `${origin}/${route}/${data.slug}`;
      const html = await readFile(`dist/${route}/${data.slug}.html`, "utf8");
      assert.ok(html.includes(`rel="canonical" href="${url}"`), url);
      assert.ok(html.includes(`property="og:url" content="${url}"`), url);
      assert.ok(html.includes('property="og:title"'), url);
      assert.ok(html.includes('property="og:image"'), url);
      assert.match(html, /<article\b/, `${url}: missing prerendered article`);
      assert.ok(sitemap.includes(`<loc>${url}</loc>`), url);
    }
  }
});

test("robots points to the production sitemap", async () => {
  const robots = await readFile("dist/robots.txt", "utf8");
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
});

test("all historical heading anchors remain available in prerendered HTML", async () => {
  const inventory = JSON.parse(await readFile("migration/legacy-headings.json", "utf8"));
  let checked = 0;
  for (const [route, headings] of Object.entries(inventory)) {
    const publicRoute = route.replace(/^post\//, "blog/");
    const $ = load(await readFile(`dist/${publicRoute}.html`, "utf8"));
    const ids = new Set($("[id]").toArray().map((element) => $(element).attr("id")));
    for (const heading of headings) {
      assert.ok(ids.has(heading.id), `/${publicRoute}#${heading.id}`);
      checked++;
    }
  }
  assert.ok(checked > 0, "The legacy anchor inventory is empty");
});

test("image srcset candidates encode spaces and commas", async () => {
  const $ = load(await readFile("dist/project/klever.html", "utf8"));
  const srcsets = $("img[srcset]").toArray().map((element) => $(element).attr("srcset"));
  assert.ok(srcsets.length > 0);
  assert.ok(srcsets.some((value) => value.includes("%20")), "expected a filename containing spaces");
  for (const value of srcsets) for (const candidate of value.split(",")) {
    assert.match(candidate.trim(), /^\S+\s+\d+w$/);
  }
});
