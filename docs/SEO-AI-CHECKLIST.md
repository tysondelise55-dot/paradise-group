# SEO and AI visibility checklist (for the owner)

## Built into the site
- Unique title, description and canonical on every page; Open Graph + Twitter cards with a branded 1200×630 image.
- JSON-LD: `EntertainmentBusiness` (name, legal name, logo, Carmel IN, areas served, socials as `sameAs`, team, offer catalog) on every page; breadcrumbs on inner pages.
- `sitemap.xml`, `robots.txt` (search and AI crawlers allowed, `/api/` blocked), `manifest.webmanifest`, icons.
- `llms.txt` and `llms-full.txt` for AI assistants, generated from the same data as the pages.
- All text server-rendered; images sized, with alt text; fonts self-hosted through `next/font`.

## What the owner should do
1. **Google Business Profile.** Create or claim it as a service-area business (hide the street address if there's no public location), category "DJ service", service areas Carmel, Indianapolis, Bloomington. Add the logo, the Ocean photos, and the website. Send the profile URL to the developer for `sameAs`.
2. **Reviews.** Ask venue managers and party hosts for Google reviews after each event (a short link in a text the next day). Never buy or swap reviews. Real reviews can then go on the site.
3. **A phone number or email.** Searchers and venues look for one; the schema and footer will show it once supplied.
4. **Search Console and Bing Webmaster Tools.** Verify the domain and submit `https://paradisegroupx.com/sitemap.xml`.
5. **Consistent name everywhere.** "The Paradise Group" (Paradise Group LLC) on Instagram, TikTok, YouTube, Facebook, Linktree, Google, Apple Business Connect and Yelp.
6. **Keep the timeline fresh.** Each new venue or big night is a line in `src/lib/data.ts` (milestones). AI assistants cite concrete, dated facts like these.
7. **Monthly check.** Ask ChatGPT, Claude, Perplexity and Google "DJ for a graduation party in Carmel, Indiana" and "DJ and lighting for bars in Indianapolis" and see whether the site comes up.
8. **Training crawlers.** They are allowed by default. To opt out of AI training while staying in AI search, see the comment in `src/app/robots.ts`.
