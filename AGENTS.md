<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## This site

- The Paradise Group (DJ, lighting, event production, Carmel IN). Source: https://paradisegroupx.com.
- All facts and copy live in `src/lib/data.ts`. Never invent facts: no phone, email, address, prices, reviews or stats exist on the source. See `DESIGN-BRIEF.md` for what was deliberately left out (placeholder stats marked `// REPLACE` in the old site's code).
- Motion follows the build-website skill's `references/motion.md` (JS gate, `useGSAP` with scope, no CSS-hidden content, no scroll fade-ins).
- Business name: always Archivo condensed, bold, uppercase (`.brand__name` / `.display`). No mixed fonts or italics in it.
- Quality gate before shipping: tsc, lint, build, then `verify.mjs` must report 0 problems.
