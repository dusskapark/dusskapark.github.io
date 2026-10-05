# Hey, Joo — portfolio

Joo Hyung Park’s portfolio, rebuilt with Next.js App Router, React, Tailwind CSS,
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
pnpm test
pnpm lint
pnpm build
pnpm typecheck
pnpm start
# In another terminal:
pnpm check:site
```

`pnpm build` validates the content and prepares assets before compiling all routes.
Migration checks compare original content and the migrated records. The HTTP
verification script checks the production server, including legacy addresses.

## Content and deployment

- [Writing and media guide](docs/content-authoring.md)
- [Preview, production, and rollback runbook](docs/deployment-runbook.md)
- `migration/` contains the content, gallery, media, and URL inventories.
- `content/projects/` and `content/posts/` are the editable MDX content.

Legacy Jekyll files remain as migration evidence. They are not the Next.js public
directory. The old GitHub Pages workflow is manual-only and defaults to the last
known Jekyll commit for rollback. Production DNS changes are a separate cutover.

## Credits

Visual direction and interaction patterns are adapted from
[shadcn-portfolio](https://github.com/techwithanirudh/shadcn-portfolio), by Anirudh
Sriram. See [third-party notices](THIRD_PARTY_NOTICES.md). The legacy theme’s
original license remains in `_LICENSE.md`.
