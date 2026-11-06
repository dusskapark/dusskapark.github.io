import test from "node:test";
import assert from "node:assert/strict";
import { contentMetadata } from "../scripts/content-source.mjs";

test("reads formatted React metadata without executing the module", () => {
  const data = contentMetadata(`throw new Error('must not run');\nexport const frontmatter = {\n  title: 'Example', listed: true, tags: ['one'], nested: { count: 2 }\n};`, "example.jsx");
  assert.equal(data.title, "Example");
  assert.deepEqual(data.tags, ["one"]);
  assert.equal(data.nested.count, 2);
});

test("rejects executable or missing metadata", () => {
  assert.throws(() => contentMetadata("export const frontmatter = { title: process.env.SECRET };", "example.jsx"), /literal/);
  assert.throws(() => contentMetadata("export default function Page() {}", "example.jsx"), /frontmatter/);
});
