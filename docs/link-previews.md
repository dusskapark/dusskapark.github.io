# Content link previews

Use the shared shadcn/ui Card-based component in MDX:

```mdx
<LinkPreview url="https://example.com/article" />

<LinkPreviewGrid>
  <LinkPreview url="https://example.com/first" />
  <LinkPreview url="https://example.com/second" />
</LinkPreviewGrid>
```

`pnpm build` and `pnpm dev` discover literal `LinkPreview url="..."` references and prepare metadata before Vite runs. `content/link-previews.json` stores the actual source page's OG title, description, image, and site name, with Twitter/HTML metadata as fallbacks. Missing images use a neutral link icon. No metadata requests run in the visitor's browser.

Saved metadata expires after seven days. Run `pnpm prepare:links --refresh` to refresh early. Request failures preserve existing snapshots; new unavailable pages show their hostname and URL. Figma Community can return HTTP 403 to build requests: its current entries were captured from the public pages' actual browser DOM meta tags and retain that provenance in the snapshot.

GitHub OG images are saved under `images/link-previews/` and copied to public assets by `prepare:assets`, because direct image hotlinks can fail. The original OG image URL remains recorded in the metadata. Other OG images retain their source URLs.

Metadata parser checks: `node --test tests/link-preview-metadata.test.mjs`.
