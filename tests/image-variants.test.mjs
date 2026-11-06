import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "content/image-variants.json"), "utf8"));

test("every optimized variant listed in the manifest exists", () => {
  const missing = Object.values(manifest)
    .flatMap((entry) => entry.variants.map((variant) => variant.src))
    .filter((src) => !fs.existsSync(path.join(root, src)));
  assert.deepEqual(missing, []);
});

test("variant outputs are unique, so sources never overwrite each other", () => {
  const outputs = Object.values(manifest).flatMap((entry) => entry.variants.map((v) => v.src));
  assert.equal(new Set(outputs).size, outputs.length);
});

test("local images referenced by MDX exist and have optimized variants", () => {
  const contentDir = path.join(root, "content");
  const problems = [];
  for (const name of fs.readdirSync(contentDir, { recursive: true })) {
    if (!name.endsWith(".mdx")) continue;
    const text = fs.readFileSync(path.join(contentDir, name), "utf8");
    for (const [, src] of text.matchAll(/["(<](\/images\/[^"<>)]+\.(?:png|jpe?g|gif|webp))/gi)) {
      const decoded = decodeURIComponent(src);
      if (!fs.existsSync(path.join(root, decoded))) problems.push(`${name}: missing ${src}`);
      else if (!manifest[decoded]) problems.push(`${name}: no variants for ${src}`);
    }
  }
  assert.deepEqual(problems, []);
});
