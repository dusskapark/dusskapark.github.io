// Saves 16:9 YouTube thumbnails for every embedded video so the click-to-play
// facade never hotlinks i.ytimg.com. Run `pnpm fetch:thumbnails`, then
// `pnpm optimize:images`, after adding a YouTube video.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "images", "video-thumbnails");
const sources = [
  ...(await fs.readdir(path.join(root, "content"), { recursive: true }))
    .filter((name) => name.endsWith(".jsx"))
    .map((name) => path.join(root, "content", name)),
  path.join(root, "src", "components", "site", "narrative-home.tsx"),
];
const ids = new Set();
for (const file of sources) {
  const text = await fs.readFile(file, "utf8");
  for (const match of text.matchAll(/youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})(?![A-Za-z0-9_-])/g))
    if (match[1] !== "videoseries") ids.add(match[1]);
  for (const match of text.matchAll(/\bvideo(?:En)?:\s*"([A-Za-z0-9_-]{11})"/g))
    ids.add(match[1]);
}

await fs.mkdir(outputDir, { recursive: true });
const missing = [];
for (const id of [...ids].sort()) {
  const output = path.join(outputDir, `${id}.jpg`);
  if (await fs.stat(output).then(() => true, () => false)) continue;
  let saved = false;
  for (const quality of ["maxresdefault", "sddefault", "hqdefault"]) {
    const response = await fetch(`https://i.ytimg.com/vi/${id}/${quality}.jpg`);
    if (!response.ok) continue;
    const image = sharp(Buffer.from(await response.arrayBuffer()));
    const { width, height } = await image.metadata();
    // sd/hq thumbnails are 4:3 with letterboxing; keep the 16:9 center.
    const cropHeight = Math.round((width * 9) / 16);
    await image
      .extract({ left: 0, top: Math.round((height - cropHeight) / 2), width, height: cropHeight })
      .jpeg({ quality: 86 })
      .toFile(output);
    saved = true;
    break;
  }
  if (!saved) missing.push(id);
}
console.log(`Video thumbnails ready for ${ids.size - missing.length} of ${ids.size} videos.`);
if (missing.length) console.warn(`No public thumbnail (video may be private or removed): ${missing.join(", ")}`);
