import assert from "node:assert/strict";
import test from "node:test";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

function frontmatterExpression(type, value) {
  const tree = { type: "root", children: [{ type, value }] };
  remarkMdxFrontmatter({ name: "frontmatter" })(tree, {});
  const declaration = tree.children[0].data.estree.body[0].declaration.declarations[0];
  assert.equal(declaration.id.name, "frontmatter");
  return declaration.init;
}

function property(expression, name) {
  return expression.properties.find((entry) => entry.key.value === name)?.value;
}

for (const [type, value] of [
  ["yaml", 'title: Example\nsection:\n  count: 42'],
  ["toml", 'title = "Example"\n[section]\ncount = 42'],
]) {
  test(`${type} frontmatter is exported with nested values`, () => {
    const expression = frontmatterExpression(type, value);
    assert.equal(property(expression, "title").value, "Example");
    assert.equal(property(property(expression, "section"), "count").value, 42);
  });
}

test("invalid TOML frontmatter is rejected", () => {
  assert.throws(() => frontmatterExpression("toml", "title = ["));
});
