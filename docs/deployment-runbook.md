# Deployment runbook

This app is a single Next.js 16 / React 19 site deployed through Vercel. The production portfolio currently remains on GitHub Pages/Jekyll at `https://api.metadata.co.kr`. Vercel deployments are available for review. The custom-domain DNS cutover has not happened; its DNS provider is Cafe24.

## Build requirements

- Node.js `>=22.21.1`
- pnpm `12.6.0` (`package.json` pins the package manager)
- Vercel framework: Next.js
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`

Run the same checks before reviewing a deploy:

```sh
pnpm install --frozen-lockfile
pnpm check:content
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

The build hook prepares the generated image tree and validates MDX before Next.js builds. To run `pnpm check:site` locally, start the built app with `pnpm start` in one terminal, then run the check from another terminal. The check can also target a deployed preview with `SITE_CHECK_URL=https://<preview-host> pnpm check:site`. `pnpm dev` also prepares assets. Keep source images in `images/`; `public/images/` is generated and ignored by Git.

There is no application secret or required deployment environment variable. The canonical origin is set in `src/lib/site.ts` to `https://api.metadata.co.kr`. Vercel supplies `VERCEL_ENV`; the app uses the value `preview` to turn off indexing for previews. `PORTFOLIO_PREVIEW=1` also disables indexing, which is used for the temporary `hey-joo-portfolio.vercel.app` review alias. Omit that override from the final custom-domain production build. Do not replace the canonical origin with a preview hostname or change the production origin during preview review.

## Preview deployment

Use a Vercel Preview deployment for pull requests or a non-production branch. Keep `api.metadata.co.kr` attached to the existing GitHub Pages site until cutover verification is complete. Do not point DNS or the Vercel custom-domain setting at a preview.

For each preview, check the actual generated site in a browser and confirm:

- `/`, `/projects`, `/about`, `/blog`, and representative project/post pages load.
- `/project/naver-now` remains reachable directly and stays out of the project listings.
- Old detail paths `/project/<slug>` and `/blog/<slug>` render. `.html` legacy paths redirect to their extensionless routes; `/thanks` redirects to `/#contact`.
- `robots.txt`, page metadata, and the response header keep the preview out of search (`Disallow: /`, `noindex, nofollow`, and `X-Robots-Tag`).
- Page canonical links and Open Graph URLs use the production origin from `src/lib/site.ts`; this is expected while the preview is marked noindex.
- The sitemap lists `/`, `/projects`, `/blog`, `/about`, and all project/post detail routes, including unlisted Naver NOW. `listed: false` only removes a card from the site listings; it does not make the detail page private or remove it from the sitemap.
- The preview's `robots.txt` disallows crawling and still points its sitemap directive to the canonical production host. Submit only the production sitemap to search tools.
- Images load from `/images/`, embeds have useful titles, and the contact action opens the intended email address.

Run the full route, redirect, content, media, and sitemap audit against the preview URL:

```sh
SITE_CHECK_URL=https://<preview-host> pnpm check:site
curl -sSI https://<preview-host>/ | rg -i 'x-robots-tag'
curl -sS https://<preview-host>/robots.txt
```

Vercel's `vercel.json` selects the Next.js framework, locked pnpm install, and the build command. Avoid adding API keys for this portfolio: the contact method is email-only and the app has no CMS, authentication, database, comments, or form submission service.

## Current production and rollback anchor

The existing production site must keep serving its current Jekyll release until the replacement is verified and Cafe24 DNS is switched. The checked-in `CNAME` file names `api.metadata.co.kr`; the GitHub Pages workflow in `.github/workflows/pages.yml` is also the legacy deploy path. Retain both while Vercel previews are being reviewed. Do not change DNS, GitHub Pages settings, or the custom domain as part of a preview deploy.

The immutable Jekyll rollback anchor is commit `ed197c80654785b199336f15c841b65777512ace` (the Jekyll site as it stood when the Next migration began, currently `origin/master`). Keep that commit reachable from the remote and retain the ability to manually build/deploy it. The Pages workflow is manual-only and its `legacy_ref` input defaults to this exact commit. For rollback, dispatch it with the pinned SHA rather than the moving Next migration branch. Confirm the workflow and remote ref still have this behavior before any cutover; if the ref is missing, restore it before proceeding.

## Capture the current DNS before cutover

DNS must be recorded before a later cutover so it can be restored exactly. Do this immediately before the approved window, since answers and TTLs can change. Save the output with a UTC timestamp in the release or incident record; do not rely on a screenshot alone.

```sh
date -u
dig +noall +answer api.metadata.co.kr A
dig +noall +answer api.metadata.co.kr AAAA
dig +noall +answer api.metadata.co.kr CNAME
dig +noall +answer metadata.co.kr A
dig +noall +answer metadata.co.kr AAAA
dig +noall +answer metadata.co.kr NS
dig +noall +answer metadata.co.kr TXT
```

Also record the DNS provider, record names/types/values/TTLs shown in its control panel, GitHub Pages' custom-domain and certificate status, and the exact target values shown in the Vercel Domains panel. Do not guess Vercel IPs or change nameservers. The repo's `CNAME` file is not a substitute for the live DNS snapshot.

## Approved cutover procedure

Only start this section after the owner explicitly approves moving `api.metadata.co.kr` to Vercel. Keep the Jekyll rollback anchor and captured DNS available throughout.

1. Confirm the Vercel production build is green, the required checks pass, and the candidate was reviewed at its preview URL. Check all routes, metadata, images, redirects, robots, sitemap, and email contact behavior.
2. Confirm the production canonical origin remains `https://api.metadata.co.kr`. Check that production responses allow indexing and that preview responses remain noindex.
3. Capture the current DNS as described above. Record the GitHub Pages domain configuration and the candidate Vercel production deployment ID/URL.
4. Add `api.metadata.co.kr` to the Vercel project and use only the DNS record values Vercel shows for this project. Apply the minimal record change at the existing DNS provider; do not transfer or replace nameservers.
5. Wait for DNS and TLS to settle. Check the domain resolves to Vercel from more than one resolver, the certificate is valid, and the homepage returns successfully over HTTPS.
6. Recheck canonical metadata, robots and sitemap, redirects, the hidden Naver NOW direct URL, and the email link on the production hostname. Review application and deployment logs for build/runtime errors.
7. Keep the previous GitHub Pages release, pinned Jekyll ref, and DNS snapshot available until production is stable and the owner closes the cutover.

Useful read-only checks after a record change:

```sh
dig +noall +answer api.metadata.co.kr A
dig +noall +answer api.metadata.co.kr AAAA
dig +noall +answer api.metadata.co.kr CNAME
curl -sS -I https://api.metadata.co.kr/
curl -sS -I https://api.metadata.co.kr/projects
curl -sS https://api.metadata.co.kr/robots.txt
curl -sS https://api.metadata.co.kr/sitemap.xml
```

## Roll back to Jekyll

If the approved cutover causes a production issue, use the captured DNS record values to restore the GitHub Pages target, then verify DNS, TLS, `/`, a project detail URL, and `/robots.txt`. If the Pages artifact must be rebuilt, use the workflow's pinned rollback ref at `ed197c80654785b199336f15c841b65777512ace`; do not build the current migration branch as the rollback artifact. Keep the Vercel deployment available for diagnosis until the restored Jekyll site is confirmed healthy.

No Vercel production cutover, DNS edit, or production deploy is performed by authoring this runbook.
