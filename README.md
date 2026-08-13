# Evidence Studio website

Production marketing site and interactive premium product sample for Evidence Studio.

**Production:** <https://evidence-studio-site.pages.dev/>

**Chrome Web Store:** <https://chromewebstore.google.com/detail/evidence-studio/afnfhhfbcbgagblgankihdfejaiccjdn?utm_source=github_readme&utm_medium=referral&utm_campaign=evidence_studio_launch>

## Choose a path

- **Try one project free:** install the public Chrome extension; no paid licence is needed for the first local project.
- **Use it across client work:** [review the €99 one-time founding licence](https://evidence-studio-site.pages.dev/?utm_source=github_readme&utm_medium=referral&utm_campaign=evidence_studio_launch#founding) for unlimited local projects and client-ready exports. Gumroad shows the final amount and applicable tax before payment.
- **Prove one team workflow:** [review the €750 fixed-scope agency pilot](https://evidence-studio-site.pages.dev/?utm_source=github_readme&utm_medium=referral&utm_campaign=evidence_studio_launch#agency). The pilot is agreed by email before payment and includes one anonymized workflow, a sample project, an export, written notes, and one licence.

Evidence Studio is built and sold by Kuba Opoczka. The sample data is illustrative; there are no invented customer, sales, review, or performance claims.

## What is real

- Responsive landing page with light and dark themes
- Interactive evidence workflow with three sample findings
- Live report preview and downloadable standalone HTML report
- Guided six-question specialist review with a live answer brief
- Fixed-scope agency pilot brief with local-only answer handling
- Structured email handoff that sends nothing without the reviewer’s choice
- Plain-language founding offer, support runbook, privacy page, and founding licence terms
- Local self-hosted fonts and optimized AVIF and WebP product media
- Cloudflare Pages security-header configuration
- Legacy GitHub Pages workflow retained only as historical deployment configuration

The sample data is clearly labelled.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Verify

```bash
npm run check
```

This runs strict TypeScript checks, interaction tests, export safety tests, response-header policy tests, and the production build.

## Commercial configuration

The production checkout is pinned in the tracked `.env.production` file. Copy `.env.example`
to `.env.local` only when a local override is needed.

```bash
VITE_REVIEW_EMAIL=kuba.opoczka@gmail.com
VITE_CHECKOUT_URL=https://opoczka.gumroad.com/l/evidence-studio
```

The live Gumroad URL is used for the founding licence. The production build fails if the
verified checkout, paid hero action, or `/pilot` entry is missing. In development, leaving
`VITE_CHECKOUT_URL` empty keeps the main commercial action routed to the guided specialist
review page.

## Secure deployment

The production build includes `public/_headers`. Cloudflare Pages applies it to static responses, adding CSP, anti-framing, MIME-sniffing, referrer, permissions, HSTS and cross-origin protections. The deploy configuration is in `wrangler.jsonc`.

Authenticate once, verify, then deploy:

```bash
npx wrangler login
npx wrangler whoami
npm run check
npx wrangler pages deploy dist --project-name evidence-studio-site
```

The Cloudflare production origin and final canonical URLs were first deployed and verified on 19 July 2026. Re-run the live response-header checks after every hosting, custom-domain or `_headers` change. Smoke-test the public Store and Gumroad licence flows after every release that changes installation or licensing.
