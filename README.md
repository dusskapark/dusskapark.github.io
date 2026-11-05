# Hey, Joo — portfolio

Joo Hyung Park’s portfolio, built with Vite, React Router, React, Tailwind CSS,
shadcn/Radix UI, and local MDX. Production origin: <https://api.metadata.co.kr>.

## Development

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Node.js 22 is required (`.nvmrc` pins 22.21.1). The package manager version is pinned in
`package.json`. No database, CMS, mail service, or API credentials are required.
The asset preparation step copies original `images/` into ignored `public/images/`.

## Checks

```sh
pnpm typecheck
pnpm build
pnpm preview
```

`pnpm build` prepares assets and compiles the React application and local MDX into
`dist/`. `pnpm preview` serves that production build locally.

Vercel uses the Vite preset, `pnpm install --frozen-lockfile`, `pnpm build`, and
the `dist` output directory. `vercel.json` rewrites application routes to
`index.html` so React Router detail pages work when opened directly or refreshed.

## Content and deployment

- [Writing and media guide](docs/content-authoring.md)
- [Preview, production, and rollback runbook](docs/deployment-runbook.md)
- `migration/` contains the content, gallery, media, and URL inventories.
- `content/projects/` and `content/posts/` are the editable MDX content.

Legacy Jekyll files remain as migration evidence. They are not the Vite public
directory. The old GitHub Pages workflow is manual-only and defaults to the last
known Jekyll commit for rollback. Production DNS changes are a separate cutover.

## Credits

Visual direction and interaction patterns are adapted from
[shadcn-portfolio](https://github.com/techwithanirudh/shadcn-portfolio), by Anirudh
Sriram. See [third-party notices](THIRD_PARTY_NOTICES.md). The legacy theme’s
original license remains in `_LICENSE.md`.
