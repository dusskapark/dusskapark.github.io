import test from "node:test";
import assert from "node:assert/strict";
import { parseMetadata, httpUrl } from "../scripts/link-preview-metadata.mjs";

test("OG metadata takes precedence, decodes entities, and resolves relative image URLs", () => {
  const result = parseMetadata(`
    <title>Fallback</title>
    <meta content="Source &amp; Preview" property="og:title">
    <meta name="twitter:title" content="Twitter title">
    <meta property="og:description" content="Original &quot;description&quot;">
    <meta property="og:image" content="/images/preview.png">
    <meta property="og:site_name" content="Source">
  `, "https://example.com/article");
  assert.equal(result.title, "Source & Preview");
  assert.equal(result.description, 'Original "description"');
  assert.equal(result.image, "https://example.com/images/preview.png");
  assert.equal(result.siteName, "Source");
});

test("missing OG uses source HTML metadata without inventing an image", () => {
  const result = parseMetadata('<title>Research page</title><meta name="description" content="Research summary">', "https://example.com/");
  assert.equal(result.title, "Research page");
  assert.equal(result.description, "Research summary");
  assert.equal(result.image, undefined);
});

test("unsafe image and link protocols are excluded", () => {
  assert.equal(httpUrl("javascript:alert(1)"), undefined);
  assert.equal(httpUrl("data:image/svg+xml,test"), undefined);
  assert.equal(parseMetadata('<meta property="og:image" content="javascript:alert(1)">', "https://example.com").image, undefined);
});
