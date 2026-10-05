# Portfolio verification

Run `pnpm test` for the migrated route, metadata, and gallery parity checks.
With the site running, run `pnpm check:site -- http://localhost:3001` for the rendered HTTP audit.
Add `--report tests/verification-report.json` to save its results.

The independent fixture is frozen from original Jekyll Markdown at commit `ed197c8` and a fresh Jekyll build of that commit. It covers all 17 projects and the three non-demo posts, including the hidden NAVER NOW URL. The 510 prose excerpts are included only when they also match the original source; fenced code comments are not treated as headings.

The HTTP audit checks server-rendered content, every original gallery grouping/image/link/caption, code samples, metadata, aliases, internal fragments, public asset responses, and intentionally excluded routes. It also checks that smooth scrolling is declared to Next so the router can suspend it during navigation. External service availability is outside this local audit.

Browser verification uses CUA in a separate tab. The interaction checklist is navigation and metadata changes, translation links, menu focus trap/Escape/focus restoration, back/forward scroll restoration, carousel arrows/touch/pause, image dialog arrows/focus trap/restoration, native video, and no-JavaScript/reduced-motion modes. HTTP parity does not by itself prove those interactions or full visual accessibility.
