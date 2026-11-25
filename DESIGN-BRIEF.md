# Design brief: The Paradise Group

Source: https://paradisegroupx.com (scraped 2026-11-25; 6 pages: home, about, nightlife, team, contact).

## Facts (copied from the source site)

- **Business name:** The Paradise Group. Legal name in the footer: **Paradise Group LLC**.
- **What they do:** DJ, lighting and event production services (source meta description: "DJ, lighting, and event production services in Carmel, IN").
- **Based in:** Carmel, IN. Timeline closes with "Booking new venues and bars, ready to bring the Paradise experience to Indy and beyond."
- **Phone / email / street address / hours:** none published anywhere on the site. The only contact route is a form (posts to Formspree `https://formspree.io/f/xrejwbwb`) with fields First name, Last name, Mobile no.*, Email address*, Expected guest size*, Message.
- **Socials:**
  - YouTube https://www.youtube.com/@paradisegroupx
  - Facebook https://www.facebook.com/profile.php?id=61555787379574
  - Instagram https://www.instagram.com/paradisegroupx
  - TikTok https://www.tiktok.com/@theparadisegroupx
  - Linktree https://linktr.ee/theparadisegroupx
- **Home copy:** "Events Made Simple." / "On with the SHOW! We can supply all types of equipment to suit the needs of your space (preferably), or we can adapt to your venue's system. The Paradise Group has created engaging, exciting experiences for crowds all around Carmel." / "Experience ... With more than 6 years of event experience ..." / "Engage Your Crowd. An amped-up and engaged crowd will make your party more memorable. Our dynamic mixes capture your audience's attention and boost the party spirit."
- **About / mission:** "Spanning multiple areas of production and entertainment, we can provide flexible, high-impact production and entertainment services to suit the needs of your business! Create powerful lighting and atmosphere with our equipment and take your audiences' breath away with incredible mixes and music from top-tier DJs. We work hand-in-hand with your venue, performers, and team to seamlessly integrate with your setup and add emphasis on your business's focus."
- **Events covered:** Birthdays, Graduations, School & Community Dances, Reunions, "You name it!"
- **Every plan includes:** Curated Sets, PA System for Announcements, Live DJ and Music, Engaging Lighting, High-Quality Audio.
- **Pricing:** "Flexible pricing based on the size and duration of the event and the amount of equipment required." No prices published.
- **Nightlife services (6):** DJ Entertainment (sets built around your room and your crowd, from warm-up to last call) · Lighting (color, movement and effects that turn a bar into a scene) · Sound (full systems for your space, or tuned to the system you already have) · "Security" (text: show flow, setup and timing handled from load-in to close) · Crowd Engagement (live energy that pulls people onto the floor and keeps them there) · Social Promotion (theme nights and full-venue events that give guests a reason to show up).
- **Built for venues and bars:** Your space, our setup · A floor that stays full · Nothing for you to manage (sound, lighting and show flow handled from load-in to last call, so your staff can focus on service).
- **Timeline ("Where the nights have taken us"):**
  - January 2024: Launched in Carmel, IN. "A DJ board, a lighting kit, and a room that needed energy."
  - August 2025: Yatagarasu Ramen Bar. First venue residency.
  - May 2026: Loren & Mari's. First full venue takeover: sound, lighting and production under one team.
  - August 2026: Serendipity Martini Bar. First contracted event: recurring nights.
  - September 2026: Ocean Sports Bar. Biggest crowd yet: over 300 guests in one night.
  - Today: booking new venues and bars, Indy and beyond.
- **Team:**
  - **Coyer Paradise**, Owner / Associate DJ. Wedding, club and bar DJ; "play to the crowd instead of trying to force the crowd to adapt to your music tastes." Link: https://linktr.ee/djparadiseofficial
  - **Dylan Delise**, Event Coordinator. Over 3 years in the event industry; studying film at Indiana University; marketing/talent manager for Yatagarasu Ramen Bar in Bloomington, IN.
  - **Anthony Tambo** (DJ Tambo), Associate DJ. DJ, producer and musician around Bloomington, IN; over 2 years of experience; plays saxophone during large events. Quote about watching the DJ at his cousin's wedding. Link: https://www.instagram.com/dj.tambo/
- **Reviews:** none on the source site.

### Facts deliberately NOT used

- Nightlife stat beats "100+ events produced", "10,000+ attendees", "25+ venues and clubs served", "95% returning clients": each is marked `// REPLACE` in the site's own `nightlife.js`, i.e. template placeholders. Not used.
- Years of experience: the home page says "more than 6 years", the nightlife page says "3+", the timeline starts January 2024. Contradictory, so no years figure is used.
- "Yielding thousands in event revenue" (Ocean Sports Bar): a vague revenue claim aimed at venues; left out.
- Two videos (`videobackgroundloop.mp4`, `coupledancing_scrub.mp4`): the dance clip looks like stock footage, not this business; neither is used.

### Images kept (all from the source, self-hosted in `public/images/`)

- `brand/palm-aqua.png`, `palm-white.png`, `palm-pink.png`: the palm-tree logo (256–420px).
- `events/*`: 9 photos from Ocean Sports Bar nights (CO2 jets, DJ booth, lasers, crowd).
- `team/*`: three portraits (first frame of the source GIFs, 736×675).

## Vibe

A young, high-energy DJ and lighting crew from Carmel playing bars, venue takeovers and private parties (birthdays, grads, school dances). The current site is dark navy with aqua neon, a palm-tree logo, a script display font and a "sunset" accent that fades aqua → pink → violet on the nightlife page. Customers: bar and venue owners who want a packed night, and parents/students/hosts booking a private event. Keep the after-dark neon feel; make it sharper and easier to book.

## Kind

**service** (they are hired and the work happens at the venue). tasteskill trade: closest is `agency`; we used `start.mjs brand` with the business's own colours instead of a dealt palette.

## Art direction

- **Palette** (brand-derived via `start.mjs brand --bg #0d0d1a --ink #e8ecf2 --accent #80ddee --type archivo --radius soft`, plus the site's own sunset pink):
  - `--night` #0d0d1a (base)
  - `--night-2` #151623 (surface)
  - `--night-3` #1c1e30 (raised surface, borders)
  - `--ink` #e8ecf2 (text)
  - `--muted` #9a9cab (secondary text)
  - `--aqua` #80ddee (primary accent, actions; the logo colour)
  - `--sunset` #ff6fae (second accent, used sparingly: one per screen)
- **Fonts:** Archivo (variable, `wdth` axis) for everything; display set condensed (`font-stretch: 68%`), bold, uppercase, echoing the DIN 1451 used on the source's nightlife page. JetBrains Mono for small labels (the source uses mono body copy on nightlife). The business name always in Archivo condensed bold uppercase.
- **Motifs:** the palm logo, thin laser lines, a five-bar equalizer that bounces on hover.
- **Motion personality (GSAP standard):** quick and punchy like a drop: split-letter hero titles, hero photo scale-in + parallax, magnetic primary buttons, a scroll-velocity marquee of services, a count-up on the 300-guest night, the nightlife timeline line filling as you scroll, header hide/show. No scroll fade-ins.
