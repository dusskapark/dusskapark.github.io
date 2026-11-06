# Portfolio verification

Run `pnpm check:content`, `pnpm test`, `pnpm typecheck`, `pnpm build`, and
`node --test tests/static-pages.test.mjs tests/content-regression.test.mjs`. The tests cover the legacy content
inventory, reviewed media replacements, image variants, React content metadata, and static
canonical/social tags and sitemap entries.

The independent fixture was captured from the original Jekyll site at commit
`ed197c8`. The current React content is the source of truth; the fixture is retained for
checking the migration, not for undoing later editorial changes.

For the mobile and desktop narrative regression, start the Vite dev server at
`http://127.0.0.1:3000`, then run `playwright-cli open http://127.0.0.1:3000/ --mobile`,
`playwright-cli run-code --filename=tests/narrative-mobile.browser.js`, and
`playwright-cli close`.

For scroll-driven text, run `pnpm build` and `pnpm preview`, open the preview
with `playwright-cli`, then run `playwright-cli run-code --filename=tests/narrative-reading.browser.js`.
This checks desktop and mobile scrolling in both directions, reduced motion,
forced colors, and the JavaScript-disabled fallback. Close the browser afterward.

Run `playwright-cli run-code --filename=tests/narrative-confidential.browser.js`
against the running site to check the confidential Grab scenes and NAVER hero,
including icon loading, accessible lock labels, and mobile layout.
Run `tests/narrative-beam.browser.js` the same way to check animated connections,
responsive positioning, and the reduced-motion fallback.
