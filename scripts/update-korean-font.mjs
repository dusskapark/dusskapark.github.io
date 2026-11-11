// Refresh the self-hosted Noto Sans KR subset when adding Korean content.
// Only the unique Hangul character inventory is sent to the Google Fonts API.
//
//   node scripts/update-korean-font.mjs              always rebuild the subset
//   node scripts/update-korean-font.mjs --if-changed rebuild only when the site's Hangul
//                                                    changed (used by predev/prebuild)
//
// With --if-changed a network failure is a warning, not an error: the committed subset is
// kept, so characters missing from it fall back to the next font instead of breaking a deploy.
import fs from "node:fs/promises";
import path from "node:path";

const ifChanged = process.argv.includes("--if-changed");
const root = process.cwd();
const directory = path.join(root, "src/app/fonts");
const texts = [];
for (const folder of ["projects", "posts"]) {
  for (const filename of await fs.readdir(path.join(root, "content", folder))) {
    if (filename.endsWith(".jsx"))
      texts.push(
        await fs.readFile(path.join(root, "content", folder, filename), "utf8"),
      );
  }
}
// The home story and UI copy are not part of the project collection.
async function collectSource(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectSource(filename);
    else if (/\.[jt]sx?$/.test(entry.name)) texts.push(await fs.readFile(filename, "utf8"));
  }
}
await collectSource(path.join(root, "src"));
texts.push(await fs.readFile(path.join(root, "content/medium-feed.json"), "utf8"));
const story = await fs.readFile(path.join(root, "docs/home-narrative/home-story.ko.md"), "utf8");
const storyStart = story.indexOf("## 2. 커버레터 초안");
const storyEnd = story.indexOf("## 3. 글을 읽으며 탐색할 대표 장면", storyStart);
if (storyStart < 0 || storyEnd < 0) throw new Error("Home narrative section not found");
texts.push(story.slice(storyStart, storyEnd));
texts.push("한국어 목차로 읽기");
const characters = [
  ...new Set(
    texts.join("").match(/[ᄀ-ᇿ㄰-㆏가-힯]/g),
  ),
]
  .sort()
  .join("");

if (ifChanged) {
  try {
    const saved = JSON.parse(await fs.readFile(path.join(directory, "characters.json"), "utf8"));
    await fs.access(path.join(directory, "noto-sans-kr-content.woff2"));
    if (saved.characters === characters) {
      console.log(`Korean font subset is up to date (${characters.length} Hangul characters).`);
      process.exit(0);
    }
  } catch {
    // Missing or unreadable saved subset: rebuild it below.
  }
  console.log("Korean content changed; rebuilding the Noto Sans KR subset.");
}

async function rebuild() {
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set("family", "Noto Sans KR:wght@100..900");
  url.searchParams.set("display", "swap");
  url.searchParams.set("text", characters);
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    },
  });
  if (!response.ok)
    throw new Error(`Font stylesheet request failed: ${response.status}`);
  const stylesheet = await response.text();
  const urls = [...stylesheet.matchAll(/url\(([^)]+)\)/g)].map(
    (match) => match[1],
  );
  if (urls.length !== 1 || !stylesheet.includes("format('woff2')"))
    throw new Error(
      "Expected one variable WOFF2 font; review the upstream stylesheet.",
    );
  const fontResponse = await fetch(urls[0]);
  if (!fontResponse.ok)
    throw new Error(`Font download failed: ${fontResponse.status}`);
  const font = Buffer.from(await fontResponse.arrayBuffer());
  if (font.subarray(0, 4).toString() !== "wOF2")
    throw new Error("Invalid WOFF2 signature");
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, "noto-sans-kr-content.woff2"), font);
  await fs.writeFile(
    path.join(directory, "characters.json"),
    JSON.stringify(
      { family: "Noto Sans KR", characters, bytes: font.length },
      null,
      2,
    ) + "\n",
  );
  const license = await fetch(
    "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanskr/OFL.txt",
  );
  if (!license.ok) throw new Error("Font license download failed");
  await fs.writeFile(path.join(directory, "OFL.txt"), await license.text());
  console.log(
    `Prepared self-hosted Noto Sans KR: ${characters.length} Hangul characters, ${font.length} bytes.`,
  );
}

try {
  await rebuild();
} catch (error) {
  if (!ifChanged) throw error;
  console.warn(`Could not refresh the Korean font subset (${error.message}). Keeping the committed one.`);
}
