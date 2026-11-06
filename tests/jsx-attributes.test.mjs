import test from "node:test";
import assert from "node:assert/strict";
import { jsxAttributes } from "../scripts/jsx-attributes.mjs";

test("extracts literal JSX links without evaluating expressions", () => {
  const result = jsxAttributes(`<><a href="/research/a.md" /><a href={'/research/b.md'} /><LinkPreview url={\`https://example.com\`} /><a href={getSecret()} /></>`, "test.jsx");
  assert.deepEqual(result, [
    { tag: "a", name: "href", value: "/research/a.md" },
    { tag: "a", name: "href", value: "/research/b.md" },
    { tag: "LinkPreview", name: "url", value: "https://example.com" },
  ]);
});
