// Refresh the self-hosted Noto Sans KR subset when adding Korean content.
// Only the unique Hangul character inventory is sent to the Google Fonts API.
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const texts = [];
for (const folder of ["projects", "posts"]) {
  for (const filename of await fs.readdir(path.join(root, "content", folder))) {
    if (filename.endsWith(".mdx"))
      texts.push(
        await fs.readFile(path.join(root, "content", folder, filename), "utf8"),
      );
  }
}
texts.push("한국어 목차로 읽기");
const characters = [
  ...new Set(
    texts.join("").match(/[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/g),
  ),
]
  .sort()
  .join("");
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
const directory = path.join(root, "src/app/fonts");
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
