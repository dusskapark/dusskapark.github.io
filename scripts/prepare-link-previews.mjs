import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import { parseMetadata, httpUrl } from "./link-preview-metadata.mjs";

const cachePath = new URL("../content/link-previews.json", import.meta.url);
const contentRoot = new URL("../content/", import.meta.url);
const cache = JSON.parse(await fs.readFile(cachePath, "utf8").catch(() => "{}"));
const urls = new Set();
for (const entry of await fs.readdir(contentRoot, { recursive: true })) {
  if (!entry.endsWith(".mdx")) continue;
  const source = await fs.readFile(new URL(entry, contentRoot), "utf8");
  for (const match of source.matchAll(/<LinkPreview\s+url="([^"]+)"/g)) {
    const url = httpUrl(match[1]);
    if (!url) throw new Error(`Invalid link preview URL: ${match[1]}`);
    urls.add(url);
  }
}
await Promise.all([...urls].map(async (url) => {
  const saved = cache[url];
  if (!process.argv.includes("--refresh") && saved && Date.now() - Date.parse(saved.fetchedAt) < 7 * 86400000) return;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (!response.headers.get("content-type")?.includes("text/html")) throw new Error("Not an HTML page");
    const html = await response.text();
    if (html.length > 5_000_000) throw new Error("Page exceeds metadata size limit");
    cache[url] = parseMetadata(html, response.url);
    if (saved?.image === cache[url].image) {
      cache[url].localImage = saved.localImage;
      cache[url].imageAttemptAt = saved.imageAttemptAt;
    }
  } catch (error) {
    console.warn(`Link preview ${url}: ${error.message}. ${saved ? "Keeping saved metadata." : "Showing URL fallback."}`);
  }
}));
// GitHub OG image hotlinks can fail in browsers; preserve their source images.
for (const preview of Object.values(cache)) {
  if (!preview.image || new URL(preview.image).hostname !== "opengraph.githubassets.com") continue;
  if (preview.localImage || (!process.argv.includes("--refresh") && preview.imageAttemptAt && Date.now() - Date.parse(preview.imageAttemptAt) < 7 * 86400000)) continue;
  preview.imageAttemptAt = new Date().toISOString();
  try {
    const response = await fetch(preview.image, { signal: AbortSignal.timeout(15000) });
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length > 5_000_000) throw new Error("Image exceeds size limit");
    const extension = response.headers.get("content-type").includes("jpeg") ? "jpg" : "png";
    const filename = createHash("sha256").update(preview.image).digest("hex").slice(0, 16) + "." + extension;
    const directory = new URL("../images/link-previews/", import.meta.url);
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(new URL(filename, directory), bytes);
    preview.localImage = `/images/link-previews/${filename}`;
  } catch (error) {
    console.warn(`OG image ${preview.image}: ${error.message}. Keeping remote image fallback.`);
  }
}

await fs.writeFile(cachePath, JSON.stringify(Object.fromEntries(Object.entries(cache).sort()), null, 2) + "\n");
console.log(`Prepared ${urls.size} link previews (${[...urls].filter(url => cache[url]).length} with saved metadata).`);
