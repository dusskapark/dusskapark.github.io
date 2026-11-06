# Portfolio verification

Run `pnpm check:content`, `pnpm test`, `pnpm typecheck`, `pnpm build`, and
`node --test tests/static-pages.test.mjs`. The tests cover the legacy content
inventory, reviewed media replacements, image variants, React content metadata, and static
canonical/social tags and sitemap entries.

The independent fixture was captured from the original Jekyll site at commit
`ed197c8`. The current React content is the source of truth; the fixture is retained for
checking the migration, not for undoing later editorial changes.

For the mobile and desktop narrative regression, start the Vite dev server at
`http://127.0.0.1:3000`, then run `playwright-cli open http://127.0.0.1:3000/ --mobile`,
`playwright-cli run-code --filename=tests/narrative-mobile.browser.js`, and
`playwright-cli close`.
