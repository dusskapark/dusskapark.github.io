# Content authoring

The portfolio is a single Next.js app. The migrated baseline contains 17 project MDX files and 3 post MDX files. The Jekyll theme demo post and the unpublished include experiment are excluded. Projects and writing are checked-in MDX files; there is no CMS, sign-in, database, comment system, or form backend. Edit the source files in Git and review them in a Vercel preview before merging.

## Where content lives

- Projects: `content/projects/<slug>.mdx`
- Posts: `content/posts/<slug>.mdx`
- Original image files: `images/`
- Reusable MDX blocks: `src/components/` (see the component reference below)

Keep each filename equal to its `slug`. Use a short, stable, lowercase hyphenated slug. Projects continue to use `/project/<slug>` detail URLs, and posts use `/blog/<slug>`. The index pages are `/projects`, `/blog`, and `/about`.

The unlisted Naver NOW project is intentionally still addressable at `/project/naver-now`. Keep its `listed: false` value so it stays out of the project listings while its direct URL and sitemap entry remain available, as they were on the Jekyll site. This flag controls listing placement; it does not make a page private or noindex it. Do not rename its slug or remove its legacy paths.

## Front matter

Use YAML front matter at the start of every MDX file. A project can start with:

```mdx
---
kind: project
slug: sample-project
title: Sample Project
description: A concise description for search and sharing.
date: "2025-01-15"
lang: en
listed: true
hero: /images/projects/sample-project/hero.webp
legacyPaths:
  - /project/sample-project.html
  - /project/sample-project/
subtitle: Product project (2025)
team: Product team
role: Product Designer
galleryImages:
  - /images/projects/sample-project/hero.webp
---

Write the case study here. Use Markdown headings and the registered MDX components for rich media.
```

Posts use `kind: post`; other shared fields have the same meaning. The schema is:

| Field            |                Required | Meaning                                                                                                                                                                                                    |
| ---------------- | ----------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`           |                     Yes | `project` or `post`; must match the containing folder.                                                                                                                                                     |
| `slug`           |                     Yes | Stable URL segment and filename (without `.mdx`).                                                                                                                                                          |
| `title`          |                     Yes | Plain-text page title. Keep markup out of this field.                                                                                                                                                      |
| `description`    |                     Yes | Short summary used in page metadata and previews.                                                                                                                                                          |
| `date`           |                     Yes | Publication or project date in `YYYY-MM-DD` form.                                                                                                                                                          |
| `lang`           |                     Yes | `en` or `ko`.                                                                                                                                                                                              |
| `listed`         | No (defaults to `true`) | Whether to show the entry in its index. An unlisted entry still has a direct detail route and sitemap entry.                                                                                               |
| `hero`           |                     Yes | Root-relative public image URL, for example `/images/projects/sample/hero.webp`; HTTPS image URLs are also accepted.                                                                                       |
| `legacyPaths`    |   No (defaults to `[]`) | Old path variants kept in the migration manifest and link checks. The current Next.js config redirects `.html` paths and normalizes trailing slashes; add any custom redirect to `next.config.ts` as well. |
| `subtitle`       |                      No | Short project subtitle.                                                                                                                                                                                    |
| `team`, `role`   |                      No | Project team and your role.                                                                                                                                                                                |
| `accentColor`    |                      No | Preserved project accent color in a supported hex form.                                                                                                                                                    |
| `titleLines`     |                      No | Explicit lines for a multi-line display title.                                                                                                                                                             |
| `translationKey` |                      No | Shared key for translated versions of a post.                                                                                                                                                              |
| `authors`        |                      No | Post author names.                                                                                                                                                                                         |
| `galleryImages`  |                      No | Legacy gallery image URL list preserved from the source metadata. Put rendered galleries in the body with `Gallery`.                                                                                       |
| `sourceFile`     |                      No | Original Jekyll source path; migration provenance only.                                                                                                                                                    |
| `headings`       |   No (defaults to `[]`) | Heading objects with `depth` (integer 1–6), `text`, and `id`; used to preserve old anchors. The page can derive anchors for new content.                                                                   |

Keep titles as plain text, and put formatting in the MDX body. Dates and slugs affect sorting and URLs, so do not change them casually after publication. Keep or add `legacyPaths` when importing content that has old URL variants, and add a Next.js redirect for any non-standard alias.

The migration process records `sourceFile` and `headings` for imported entries. Treat those values as derived data and do not hand-edit them in migrated entries. For new MDX, omit both unless you need to preserve legacy heading IDs; headings and anchor IDs are derived automatically when the values are absent. `accentColor`, `titleLines`, `galleryImages`, `translationKey`, and `authors` are retained metadata from the import; do not assume a field changes the current layout or author display unless the app code uses it.

## Writing and media

Use Markdown for paragraphs, links, lists, code, and headings. Give headings a clear hierarchy (`##` for major sections and `###` for subsections); the heading text generates in-page anchor links. Keep raw HTML and inline styles to a minimum so the content stays portable and accessible. Use an existing component for media instead of pasting theme-specific Jekyll markup such as `{% include ... %}`.

Add new source images under `images/`, preferably in a project-specific folder such as `images/projects/sample-project/`. Reference them from MDX using a root-relative public URL under `/images/`. `pnpm prepare:assets` and the `predev`/`prebuild` hooks copy assets into ignored `public/images/`; do not edit or commit generated copies in `public/images/`. Use descriptive filenames, supply meaningful alt text for informative images, and include their intrinsic width and height when the component accepts those values. Keep decorative images' alt text empty only when the component supports it.

### Registered MDX components

Use these reusable blocks in MDX. `src/lib/mdx.tsx` registers their names and prop shapes for the project and post body renderer, so MDX files do not need local imports.

```mdx
<Gallery
  images={[
    {
      src: "/images/projects/sample-project/flow.webp",
      alt: "Three steps in the rider check-in flow",
      width: 1600,
      height: 900,
    },
  ]}
  columns={1}
  caption="The revised check-in flow."
  fullWidth
/>

<Figure
  src="/images/projects/sample-project/outcome.webp"
  alt="Chart comparing completion before and after the change"
  width={1600}
  height={900}
  caption="Completion increased after the change."
/>

<MediaEmbed
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
  title="Project walkthrough"
  aspectRatio="16 / 9"
  caption="A short walkthrough of the prototype."
/>

<QuoteCard
  image="/images/projects/sample-project/portrait.webp"
  text={<>“A customer quote goes here.”</>}
  caption="Customer interview, 2025"
  backgroundColor="#f5f2ed"
  fontColor="#222222"
/>

<StoreBadges
  urls={[
    "https://apps.apple.com/app/id123456789",
    "https://play.google.com/store/apps/details?id=com.example.app",
  ]}
  appName="Sample App"
  title="Get Sample App"
  description="The app is available on iOS and Android."
/>

<TweetEmbed url="https://x.com/account/status/123456789">
  <blockquote>
    <p>A static, readable quotation from the post.</p>
    <a href="https://x.com/account/status/123456789">View the original post</a>
  </blockquote>
</TweetEmbed>

<Timeline align="left">
  <TimelineItem date="Jan 2025">A milestone and its context.</TimelineItem>
</Timeline>
```

`Gallery` takes an array of image objects (`src`, optional `alt`, `width`, `height`, and per-image `caption`), `columns` (`1`, `2`, or `3`, default `2`), an optional gallery `caption`, and optional `fullWidth`. `Figure` takes one image (`src`, optional `alt`, `width`, `height`) plus optional caption and full-width layout. `MediaEmbed` needs a source URL; title and aspect ratio are optional (default `16 / 9`), and it can take a caption, original URL, and full-width layout. `QuoteCard` takes an image and rich `text`, with optional caption, background/font colors, image dimensions, and full-width layout. `StoreBadges` takes a list of store URLs plus optional app name, title, description, and full-width layout. App Store and Google Play URLs are recognized from their domains; a Microsoft Store product ID or link is also accepted. `TweetEmbed` takes the post URL and the original quote/link as children; that static content remains readable if the third-party embed cannot load. `Timeline` takes an optional `left` or `right` alignment and timeline items; each `TimelineItem` takes a date and its body as children.

If a component example does not match the current TypeScript props, follow the exported component type in `src/components/content/` and update this reference alongside the implementation. Avoid embedding third-party tracking snippets or secrets in MDX.

## Local editing loop

From the repository root, install the locked dependencies and start the app:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Before handing off a content change, run the content validator and full-site checks:

```sh
pnpm check:content
pnpm typecheck
pnpm build
```

To run the full-site check against a local production build, keep the server running in one terminal:

```sh
pnpm start
```

Then, in another terminal, run:

```sh
pnpm check:site
```

The development and build hooks prepare local assets automatically. `pnpm migrate:content` is a migration utility that regenerates the imported MDX from the legacy Jekyll source; it is not the routine authoring command and can replace hand-edited migrated entries. Use it only when intentionally re-running that import, then review its diff. `node scripts/migrate-content.mjs --check` checks that generated migration output still matches the legacy source, so it is not a check for routine hand edits. After edits, inspect the pages and image URLs in a Vercel preview.

The contact link is email-only. Update its `mailto:` destination and visible copy in the app source; there is no submission API or stored contact data.

## Korean font refresh

The site self-hosts an 85KB variable Noto Sans KR font subset covering all migrated Hangul. When adding Korean text, run `pnpm fonts:update` and commit the updated font plus `src/app/fonts/characters.json`. This optional authoring command downloads the updated subset from Google Fonts; normal builds do not need that request. Characters outside the saved subset remain readable through system font fallback. The font license is preserved in `src/app/fonts/OFL.txt`.
