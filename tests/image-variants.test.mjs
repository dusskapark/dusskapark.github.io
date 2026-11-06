import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

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

test("local images referenced by React content exist and have optimized variants", () => {
  const contentDir = path.join(root, "content");
  const problems = [];
  let checked = 0;
  for (const folder of ["projects", "posts"]) {
    const names = fs.readdirSync(path.join(contentDir, folder)).filter((name) => name.endsWith(".jsx"));
    assert.ok(names.length, `no React content in ${folder}`);
    for (const name of names) {
      const file = path.join(contentDir, folder, name);
      const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
      assert.deepEqual(source.parseDiagnostics, [], `${folder}/${name}: invalid JSX`);
      function visit(node) {
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
          const match = node.text.match(/^\/images\/[^?#]*\.(?:png|jpe?g|gif|webp)(?:[?#].*)?$/i);
          if (match) {
            const src = node.text.split(/[?#]/, 1)[0];
            const decoded = decodeURIComponent(src);
            checked++;
            if (!fs.existsSync(path.join(root, decoded))) problems.push(`${folder}/${name}: missing ${src}`);
            else if (!manifest[decoded]) problems.push(`${folder}/${name}: no variants for ${src}`);
          }
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
  }
  assert.ok(checked > 0, "no local image references found");
  assert.deepEqual(problems, []);
});
