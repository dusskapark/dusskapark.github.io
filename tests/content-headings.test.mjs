import test from "node:test";
import assert from "node:assert/strict";
import { tsImport } from "tsx/esm/api";

const { getContent, getAllContent } = await tsImport(
  "../src/lib/content.ts",
  import.meta.url,
);
const { getTableOfContents } = await tsImport(
  "../src/lib/mdx.tsx",
  import.meta.url,
);

test("styled JSX headings keep their published anchor and visible label", () => {
  const headings = getTableOfContents(getContent("project", "klever"));
  assert.deepEqual(
    headings.find((heading) => heading.text.includes("From experiment")),
    {
      depth: 3,
      text: "From experiment to product, Klever was born",
      id: "from-experiment-to-product-klever-was-born",
    },
  );
});

test("editing existing MDX updates the TOC without regenerating migration metadata", () => {
  const original = getContent("project", "klever");
  const edited = {
    ...original,
    body:
      original.body.replace(
        "## Introducing Klever",
        "## Newly edited heading",
      ) + "\n## A new section\n\nContent.\n",
  };
  const headings = getTableOfContents(edited);
  assert.ok(!headings.some((heading) => heading.text === "Introducing Klever"));
  assert.ok(headings.some((heading) => heading.id === "newly-edited-heading"));
  assert.ok(headings.some((heading) => heading.id === "a-new-section"));
  assert.equal(
    headings.find((heading) => heading.text === "💡 The Ideation Journey").id,
    "-the-ideation-journey",
  );
});

test("all migrated TOCs contain human labels rather than JSX attribute source", () => {
  for (const entry of [
    ...getAllContent("project", true),
    ...getAllContent("post", true),
  ]) {
    for (const heading of getTableOfContents(entry)) {
      assert.doesNotMatch(
        heading.text,
        /<span|backgroundColor|fontSize/,
        `${entry.slug}: ${heading.text}`,
      );
      assert.doesNotMatch(
        heading.id,
        /span-style|backgroundcolor/,
        `${entry.slug}: ${heading.id}`,
      );
    }
  }
});
