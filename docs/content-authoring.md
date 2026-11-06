# Content authoring

The portfolio is a Vite and React app. The migrated baseline contains 17 project JSX files and 3 post JSX files. The Jekyll theme demo post and the unpublished include experiment are excluded. Projects and writing are checked-in React components; there is no CMS, sign-in, database, comment system, or form backend. Edit the source files in Git and review them in a Vercel preview before merging.

## Where content lives

- Projects: `content/projects/<slug>.jsx`
- Posts: `content/posts/<slug>.jsx`
- Original image files: `images/`
- Reusable React blocks: `src/components/` (see the component reference below)

Keep each filename equal to its `slug`. Use a short, stable, lowercase hyphenated slug. Projects continue to use `/project/<slug>` detail URLs, and posts use `/blog/<slug>`. The index pages are `/projects` and `/blog`.

The unlisted Naver NOW project is intentionally still addressable at `/project/naver-now`. Keep its `listed: false` value so it stays out of the project listings while its direct URL and sitemap entry remain available, as they were on the Jekyll site. This flag controls listing placement; it does not make a page private or noindex it. Do not rename its slug or remove its legacy paths.

## Metadata and body

Export a JavaScript object named `frontmatter` and a default React body component from each JSX file. Metadata must use literal values (strings, numbers, booleans, arrays, and objects), so the build can inspect it without executing the component. For example:

```jsx
import { Gallery } from "@/components/content";

export const frontmatter = {
  kind: "project",
  slug: "sample-project",
  title: "Sample Project",
  description: "A concise description for search and sharing.",
  date: "2025-01-15",
  lang: "en",
  listed: true,
  hero: "/images/projects/sample-project/hero.webp",
  legacyPaths: ["/project/sample-project.html", "/project/sample-project/"],
};

export default function SampleProject() {
  return <>
    <h2 id="overview">Overview</h2>
    <p>Write the case study here.</p>
    <Gallery images={[{ src: "/images/projects/sample-project/hero.webp", alt: "Project overview" }]} columns={1} />
  </>;
}
```

Posts use `kind: post`; other shared fields have the same meaning. The schema is:

| Field            |                Required | Meaning                                                                                                                                                                                                    |
| ---------------- | ----------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`           |                     Yes | `project` or `post`; must match the containing folder.                                                                                                                                                     |
| `slug`           |                     Yes | Stable URL segment and filename (without `.jsx`).                                                                                                                                                          |
| `title`          |                     Yes | Plain-text page title. Keep markup out of this field.                                                                                                                                                      |
| `description`    |                     Yes | Short summary used in page metadata and previews.                                                                                                                                                          |
| `date`           |                     Yes | Publication or project date in `YYYY-MM-DD` form.                                                                                                                                                          |
| `lang`           |                     Yes | `en` or `ko`.                                                                                                                                                                                              |
| `listed`         | No (defaults to `true`) | Whether to show the entry in its index. An unlisted entry still has a direct detail route and sitemap entry.                                                                                               |
| `hero`           |                     Yes | Root-relative public image URL, for example `/images/projects/sample/hero.webp`; HTTPS image URLs are also accepted.                                                                                       |
| `legacyPaths`    |   No (defaults to `[]`) | Old path variants kept in the migration manifest. Vercel redirects `.html` paths; add non-standard aliases to `vercel.json`. |
| `subtitle`       |                      No | Short project subtitle.                                                                                                                                                                                    |
| `team`, `role`   |                      No | Project team and your role.                                                                                                                                                                                |
| `accentColor`    |                      No | Preserved project accent color in a supported hex form.                                                                                                                                                    |
| `titleLines`     |                      No | Explicit lines for a multi-line display title.                                                                                                                                                             |
| `translationKey` |                      No | Shared key for translated versions of a post.                                                                                                                                                              |
| `authors`        |                      No | Post author names.                                                                                                                                                                                         |
| `galleryImages`  |                      No | Legacy gallery image URL list preserved from the source metadata. Put rendered galleries in the body with `Gallery`.                                                                                       |
| `sourceFile`     |                      No | Original Jekyll source path; migration provenance only.                                                                                                                                                    |
| `headings`       |                      No | Imported heading objects with `depth`, `text`, and `id`, retained as migration metadata. Render matching IDs on JSX headings to preserve anchors.                                                           |

Keep titles as plain text, and put formatting in the JSX body. Dates and slugs affect sorting and URLs, so do not change them casually after publication. Keep or add `legacyPaths` when importing content that has old URL variants, and add a Vercel redirect for any non-standard alias.

The migration process records `sourceFile` and `headings` for imported entries. Treat those values as derived data and do not hand-edit them in migrated entries. For new JSX, omit both unless you need to preserve legacy heading metadata. Give headings explicit stable `id` attributes; the table of contents reads rendered `h2` and `h3` elements with IDs. `accentColor`, `titleLines`, `galleryImages`, `translationKey`, and `authors` are retained metadata from the import; do not assume a field changes the current layout or author display unless the app code uses it.

## Writing and media

Use JSX elements for paragraphs, links, lists, code, and headings. Give headings a clear hierarchy (`h2` for major sections and `h3` for subsections) and stable `id` attributes for in-page links. Keep inline styles to a minimum so the content stays portable and accessible. Use an existing component for media instead of pasting theme-specific Jekyll markup such as `{% include ... %}`.

Add new source images under `images/`, preferably in a project-specific folder such as `images/projects/sample-project/`. Reference them from JSX using a root-relative public URL under `/images/`. `pnpm prepare:assets` and the `predev`/`prebuild` hooks copy assets into ignored `public/images/`; do not edit or commit generated copies in `public/images/`. Use descriptive filenames, supply meaningful alt text for informative images, and include their intrinsic width and height when the component accepts those values. Keep decorative images' alt text empty only when the component supports it.

After adding or replacing raster images, run `pnpm optimize:images` and commit the resulting `images/_optimized/` variants and `content/image-variants.json` changes alongside the source images.

### Shared content components

Import the shared components you need from `@/components/content`, as in the example above. These blocks can then be used in JSX:

```jsx
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

If a component example does not match the current TypeScript props, follow the exported component type in `src/components/content/` and update this reference alongside the implementation. Avoid embedding third-party tracking snippets or secrets in JSX.

## Local editing loop

From the repository root, install the locked dependencies and start the app:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Before handing off a content change, run the content validator and full-site checks:

```sh
pnpm check:content
pnpm test
pnpm typecheck
pnpm build
node --test tests/static-pages.test.mjs
```

To inspect a local production build:

```sh
pnpm preview
```

The development and build hooks prepare local assets automatically. The former Jekyll sources are preserved in Git history; the React JSX files are now the source of truth. After edits, inspect the pages and image URLs in a Vercel preview.

The contact link is email-only. Update its `mailto:` destination and visible copy in the app source; there is no submission API or stored contact data.

## Korean font refresh

The site self-hosts a variable Noto Sans KR subset covering the project and post content, home narrative, and UI source text. After adding Korean text, run `node scripts/update-korean-font.mjs` and commit the updated font plus `src/app/fonts/characters.json`. This optional authoring command sends only a sorted list of unique Hangul characters to Google Fonts to download the subset; normal builds do not need that request. The font license is preserved in `src/app/fonts/OFL.txt`.
