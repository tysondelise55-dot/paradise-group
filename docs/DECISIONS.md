# Decisions

## Content
- **No phone, email or address** are published on the source, so none appear here. The mobile action bar pairs "Get a quote" with Instagram instead of a call button. No map embed on the contact page (no address to map).
- **Placeholder stats left out.** The old nightlife page shows 100+ events, 10,000+ attendees, 25+ venues and 95% returning clients, but each is marked `// REPLACE` in its own code. Only the 300-guest Ocean Sports Bar night (from the timeline) is used as a number.
- **No years-of-experience figure**: the old home page says "more than 6 years", nightlife says "3+", the timeline starts January 2024.
- **"Security" retitled "Show flow"**: the old card's text describes setup and timing, not security staff. Owner question.
- **Videos dropped**: the dance-scrub clip looks like stock footage; the hero loop is a dim black-and-white clip. Their own Ocean photos are stronger and certainly theirs.
- **"About" became "Private events"**: the old About page is mostly about private events (types covered, what's included, pricing), so the route says what it holds. The mission copy lives at the top of it.
- Quote form adds optional *event type*, *date* and *venue* fields to the old form's fields (name, mobile, email, guest size, message). Guest size became a range select.

## Design
- Brand colours kept: navy `#0d0d1a`, logo aqua `#80ddee`, the old site's sunset pink `#ff6fae` as a sparing second accent (the 300 number, the quote box border, error states).
- The old script display font was replaced by Archivo condensed, echoing the DIN 1451 used on the old nightlife page; one family plus JetBrains Mono for small labels.
- tasteskill palette: `start.mjs brand` with the business's own colours (not a dealt palette).

## Motion (GSAP standard)
- Kept: hero split-letter intro on every page, hero photo scale-in + parallax, scroll-velocity marquee, count-up on 300, timeline line fill (scrubbed), magnetic primary buttons, header hide/show, hover layer (card lift 2px, photo zoom 1.03, button step/press, underline draw, equalizer bounce on card hover).
- Not used at this level: preloader, page wipes, custom cursor.
- Motion review (review-animations): mobile menu close changed from ease-in to ease-out and shortened (0.26 s); open shortened to 0.42 s; all hover motion gated behind `(hover: hover) and (pointer: fine)`; header hide 0.45 → 0.3 s; photo zoom 0.8 → 0.6 s.
- remove-animations: nothing removed. Every remaining animation is either a once-per-page entrance, a hover response, or a scroll-linked indicator; none fire on keyboard or high-frequency actions.

## impeccable detector (fixed)
- Eyebrow chips above every h1 → replaced by real breadcrumbs (Home / Page) on inner pages, removed on home.
- Kickers above h2s ("The setup", "Where we play", "Who we are", "Since January 2024") removed; team roles moved under the names.
- Zero-offset aqua glow on the hero meta dots removed.
- Side-tab quote border replaced with a full tinted border.
