# The Paradise Group website

A rebuild of [paradisegroupx.com](https://paradisegroupx.com) (DJ, lighting and event production in Carmel, IN), made with `/build-website`.
Next.js 16 (App Router, Cache Components), TypeScript, plain CSS tokens, GSAP 3.

## Run

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

Checks: `npx tsc --noEmit && npm run lint && npm run build`, then the quality gate from the Website-builder repo:
`node ../../.claude/skills/build-website/scripts/verify.mjs http://localhost:3100 <out-dir>` against `npm start -- -p 3100`.

## Pages

| Route | What |
| --- | --- |
| `/` | Home: hero, services marquee, setup, two ways to book, venues + 300-guest night, Ocean photos, team, quote CTA |
| `/private-events` | Who they are, events covered, what every event includes, pricing |
| `/nightlife` | Services for bars and venues, why venues book them, timeline |
| `/team` | Coyer Paradise, Dylan Delise, Anthony Tambo |
| `/contact` | Quote form (posts to `/api/contact`) |

Plus `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `opengraph-image`, `llms.txt`, `llms-full.txt`, 404 and error pages.

## Where content lives

All business facts and copy: `src/lib/data.ts`. Pages, header, footer, JSON-LD and the llms files all read from it.
Photos: `public/images/{brand,events,team}` (all from the current site). Design tokens: top of `src/app/globals.css`.
Motion: `src/components/PageMotion.tsx` (per page) and `src/lib/motion.ts` (shared GSAP setup).

## Environment variables

See `.env.example`. The quote form delivers through **one** of:

- `FORMSPREE_ENDPOINT`: the Formspree form the current site already uses (`https://formspree.io/f/xrejwbwb`), or
- `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (+ optional `CONTACT_FROM_EMAIL`).

With neither set, submissions are logged on the server and the visitor still sees success (demo mode).
`NEXT_PUBLIC_SITE_URL` overrides the canonical domain (default `https://paradisegroupx.com`).

## Deploy (Vercel)

From the standalone repo (github.com/tysondelise55-dot/paradise-group): import it, leave Root Directory at the repo root. From the Website-builder repo: set **Root Directory** to `sites/paradise-group`. Add the env vars above, deploy, and point the domain at the project when the owner approves.
