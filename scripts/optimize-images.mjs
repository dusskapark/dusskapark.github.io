// Generates committed, responsive WebP variants for every raster under images/.
// Run `pnpm optimize:images` after adding or replacing images; unchanged files are skipped.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "images");
const outputRoot = path.join(sourceRoot, "_optimized");
const manifestPath = path.join(root, "content", "image-variants.json");
const stillWidths = [480, 960, 1600, 2400];
const animatedWidths = [480, 960];
const raster = /\.(png|jpe?g|webp|gif)$/i;

async function walk(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (full !== outputRoot) files.push(...(await walk(full)));
    } else if (raster.test(entry.name)) files.push(full);
  }
  return files;
}

async function isFresh(output, sourceStat) {
  try {
    return (await fs.stat(output)).mtimeMs >= sourceStat.mtimeMs;
  } catch {
    return false;
  }
}

const previous = JSON.parse(await fs.readFile(manifestPath, "utf8").catch(() => "{}"));
const manifest = {};
let generated = 0;
const sources = (await walk(sourceRoot)).sort();
// Sources like a.png and a.jpg in one folder keep their extension so their
// variants cannot overwrite each other.
const stems = new Map();
for (const file of sources) {
  const stem = file.replace(raster, "");
  stems.set(stem, (stems.get(stem) ?? 0) + 1);
}
for (const file of sources) {
  const relative = path.relative(sourceRoot, file).split(path.sep).join("/");
  const key = `/images/${relative}`;
  const stat = await fs.stat(file);
  let metadata;
  try {
    metadata = await sharp(file, { animated: true, limitInputPixels: false }).metadata();
  } catch (error) {
    console.warn(`Skipping ${key}: ${error.message}`);
    continue;
  }
  const animated = (metadata.pages ?? 1) > 1;
  const width = metadata.width;
  const height = animated ? metadata.pageHeight : metadata.height;
  const widths = (animated ? animatedWidths : stillWidths).filter((w) => w < width);
  widths.push(Math.min(width, animated ? animatedWidths.at(-1) : stillWidths.at(-1)));
  const variants = [];
  for (const w of [...new Set(widths)].sort((a, b) => a - b)) {
    const base =
      stems.get(file.replace(raster, "")) > 1
        ? relative.replace(/\.([a-z]+)$/i, "-$1")
        : relative.replace(raster, "");
    const outRelative = `${base}-${w}.webp`;
    const output = path.join(outputRoot, outRelative);
    if (!(await isFresh(output, stat))) {
      await fs.mkdir(path.dirname(output), { recursive: true });
      await sharp(file, { animated, limitInputPixels: false })
        .resize({ width: w, withoutEnlargement: true })
        .webp(animated ? { quality: 65, effort: 4 } : { quality: 78, effort: 5 })
        .toFile(output);
      generated++;
    }
    variants.push({ width: w, src: `/images/_optimized/${outRelative}` });
  }
  manifest[key] = { width, height, animated, variants };
  if (!previous[key]) console.log(`+ ${key}`);
}

// Drop derivatives whose source was removed, renamed, or re-mapped.
const referenced = new Set(
  Object.values(manifest).flatMap((entry) =>
    entry.variants.map((variant) => path.join(root, variant.src.replace("/images/", "images/"))),
  ),
);
let removed = 0;
for (const file of await fs.readdir(outputRoot, { recursive: true, withFileTypes: true })) {
  const full = path.join(file.parentPath ?? file.path, file.name);
  if (file.isFile() && !referenced.has(full)) {
    await fs.rm(full);
    removed++;
  }
}
if (removed) console.log(`Removed ${removed} stale variants.`);

await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 1) + "\n");
console.log(`Indexed ${Object.keys(manifest).length} images, generated ${generated} variants.`);
