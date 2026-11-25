/* All business content for The Paradise Group site. Every fact here comes from
   paradisegroupx.com (see DESIGN-BRIEF.md). Pages, header, footer, JSON-LD and
   the llms files all read from this file: change a fact once, here. */

export type Img = { src: string; width: number; height: number; alt: string };

const ev = (file: string, alt: string, width = 2000, height = 1333): Img => ({ src: `/images/events/${file}`, width, height, alt });

export const site = {
  name: 'The Paradise Group',
  shortName: 'Paradise Group',
  legalName: 'Paradise Group LLC',
  url: 'https://paradisegroupx.com',
  tagline: 'DJ, lighting and sound for events in Carmel, IN',
  description:
    'The Paradise Group is a DJ, lighting and event production crew from Carmel, Indiana, playing bars, venue nights, birthdays, graduations, school dances and reunions.',
  city: 'Carmel',
  region: 'IN',
  regionName: 'Indiana',
  areas: ['Carmel, IN', 'Indianapolis, IN', 'Bloomington, IN'],
  logo: {
    aqua: { src: '/images/brand/palm-aqua.png', width: 256, height: 256 },
    white: { src: '/images/brand/palm-white.png', width: 420, height: 420 },
  },
  socials: [
    { label: 'Instagram', handle: '@paradisegroupx', href: 'https://www.instagram.com/paradisegroupx' },
    { label: 'TikTok', handle: '@theparadisegroupx', href: 'https://www.tiktok.com/@theparadisegroupx' },
    { label: 'YouTube', handle: '@paradisegroupx', href: 'https://www.youtube.com/@paradisegroupx' },
    { label: 'Facebook', handle: 'The Paradise Group', href: 'https://www.facebook.com/profile.php?id=61555787379574' },
  ],
  linktree: 'https://linktr.ee/theparadisegroupx',
} as const;

export type SocialLabel = (typeof site.socials)[number]['label'];

export const primaryAction = { label: 'Get a quote', href: '/contact' } as const;

export const navItems = [
  { href: '/private-events', label: 'Private events' },
  { href: '/nightlife', label: 'Nightlife' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
] as const;

export const photos = {
  co2Stage: ev('co2-jet-stage.jpg', 'A DJ fires a CO2 jet over the crowd from the stage at Ocean Sports Bar'),
  co2Cannon: ev('co2-cannon-crowd.jpg', 'CO2 cannon and green lasers over a packed crowd under the Ocean sign', 1600, 1066),
  booth: ev('dj-booth-ocean.jpg', 'The Paradise Group crew behind the DJ booth under the neon Ocean sign', 1600, 1066),
  lasers: ev('laser-beams.jpg', 'Blue and violet laser beams fan out over the dance floor', 1600, 1066),
  handsUp: ev('crowd-hands-up.jpg', 'A crowd with hands in the air under blue lasers', 1600, 1066),
  lasersWide: ev('ocean-lasers-wide.jpg', 'Wide view of the Ocean Sports Bar floor lit with lasers and haze', 1600, 1066),
  dancefloor: ev('ocean-dancefloor.jpg', 'Guests dancing with hands raised in front of the Ocean sign'),
  outside: ev('crowd-outside.jpg', 'A group of friends posing outside the venue on an event night'),
  haze: ev('haze-lights.jpg', 'Stage lights cutting through haze above the DJ booth', 1280, 720),
};

/* ---- Services -------------------------------------------------------------- */

export type Service = { title: string; text: string };

/* From the nightlife page. The source titles the fourth card "Security" but its
   text describes show management, so it's titled by what the text says
   (owner question in HANDOFF.md). */
export const services: Service[] = [
  { title: 'DJ entertainment', text: 'Sets built around your room and your crowd, from warm-up to last call.' },
  { title: 'Lighting', text: 'Colour, movement and effects that turn a bar into a scene.' },
  { title: 'Sound', text: 'Full systems for your space, or tuned to the system you already have.' },
  { title: 'Show flow', text: 'Setup, timing and the run of the night handled from load-in to close.' },
  { title: 'Crowd engagement', text: 'Live energy that pulls people onto the floor and keeps them there.' },
  { title: 'Social promotion', text: 'Theme nights and full-venue events that give guests a reason to show up.' },
];

export const eventTypes = ['Birthdays', 'Graduations', 'School and community dances', 'Reunions'] as const;

export const included: Service[] = [
  { title: 'Live DJ and music', text: 'A DJ playing live for your event, not a playlist on shuffle.' },
  { title: 'Curated sets', text: 'Music picked for your guests and the kind of party you want.' },
  { title: 'High-quality audio', text: 'Sound equipment that fills your room cleanly.' },
  { title: 'Engaging lighting', text: 'Colour and movement that turn the space into a dance floor.' },
  { title: 'PA for announcements', text: 'A PA system for announcements, toasts and speeches.' },
];

export const pricing =
  'Pricing is flexible, set by the size of the event, how long it runs and how much equipment it needs. Tell us those three things and we send a quote.';

export const venuePoints: Service[] = [
  { title: 'Your space, our setup', text: 'We bring every piece of equipment your room needs, or plug into the system your venue already has.' },
  { title: 'A floor that stays full', text: 'Dynamic mixes and live energy keep guests dancing, and keep them coming back.' },
  { title: 'Nothing for you to manage', text: 'Sound, lighting and show flow are handled from load-in to last call, so your staff can focus on service.' },
];

/* ---- Timeline (nightlife page) --------------------------------------------- */

export type Milestone = { when: string; isoDate?: string; title: string; text: string };

export const milestones: Milestone[] = [
  { when: 'January 2024', isoDate: '2024-01', title: 'Launched in Carmel, IN', text: 'A DJ board, a lighting kit and a room that needed energy.' },
  { when: 'August 2025', isoDate: '2025-08', title: 'Yatagarasu Ramen Bar', text: 'Our first venue residency. Yatagarasu became the home of the first Paradise Group nights.' },
  { when: 'May 2026', isoDate: '2026-05', title: "Loren & Mari's", text: 'Our first full venue takeover, with sound, lighting and production under one team.' },
  { when: 'August 2026', isoDate: '2026-08', title: 'Serendipity Martini Bar', text: 'Our first contracted event, now a run of recurring nights.' },
  { when: 'September 2026', isoDate: '2026-09', title: 'Ocean Sports Bar', text: 'Our biggest crowd yet: more than 300 guests in one night.' },
  { when: 'Today', title: 'Booking new rooms', text: 'Taking on new venues and bars across Indy and beyond.' },
];

export const venues = ['Yatagarasu Ramen Bar', "Loren & Mari's", 'Serendipity Martini Bar', 'Ocean Sports Bar'] as const;

export const biggestNight = { count: 300, venue: 'Ocean Sports Bar', when: 'September 2026' } as const;

/* ---- Team ------------------------------------------------------------------ */

export type Member = {
  slug: string;
  name: string;
  role: string;
  photo: Img;
  bio: string[];
  quote?: string;
  link?: { label: string; href: string };
};

export const team: Member[] = [
  {
    slug: 'coyer-paradise',
    name: 'Coyer Paradise',
    role: 'Owner and DJ',
    photo: { src: '/images/team/coyer-paradise.jpg', width: 736, height: 675, alt: 'Coyer Paradise in a suit holding a gold microphone trophy' },
    bio: [
      'Coyer plays weddings, clubs and bars, and runs The Paradise Group.',
      'His rule as a DJ: play to the crowd in front of you instead of making the crowd adapt to your taste. Music has the power to lift a room, and he wants it to reach everyone in it.',
    ],
    link: { label: 'See DJ Paradise', href: 'https://linktr.ee/djparadiseofficial' },
  },
  {
    slug: 'dylan-delise',
    name: 'Dylan Delise',
    role: 'Event coordinator',
    photo: { src: '/images/team/dylan-delise.jpg', width: 736, height: 675, alt: 'Dylan Delise in a blazer holding a clipboard' },
    bio: [
      'Dylan coordinates every Paradise Group event and has worked in the event industry for over 3 years.',
      'He is studying film at Indiana University and is also the marketing and talent manager for Yatagarasu Ramen Bar in Bloomington, IN.',
    ],
  },
  {
    slug: 'anthony-tambo',
    name: 'Anthony Tambo',
    role: 'DJ and saxophonist',
    photo: { src: '/images/team/anthony-tambo.jpg', width: 736, height: 675, alt: 'Anthony Tambo crouching and holding out a soprano saxophone' },
    bio: [
      'DJ Tambo is a DJ, producer and musician playing events in and around Bloomington, IN, with over 2 years behind the decks.',
      'At large events he plays live saxophone over his sets.',
    ],
    quote:
      "I went to my cousin's wedding and I just couldn't help myself by watching the DJ the whole time. I didn't know what he was doing but I thought it was really cool how he was able to control the energy of a room and take the crowd on a musical journey!",
    link: { label: 'See DJ Tambo on Instagram', href: 'https://www.instagram.com/dj.tambo/' },
  },
];

/* ---- Contact form ------------------------------------------------------------ */

export const quoteEventTypes = [
  'Birthday',
  'Graduation',
  'School or community dance',
  'Reunion',
  'Bar or venue night',
  'Something else',
] as const;

export const guestSizes = ['Under 50', '50 to 100', '100 to 200', '200 to 300', 'Over 300'] as const;

/* ---- Per-page metadata ------------------------------------------------------- */

export type PageKey = 'home' | 'privateEvents' | 'nightlife' | 'team' | 'contact';

export const pageMeta: Record<PageKey, { path: string; metaTitle: string; title: string; description: string }> = {
  home: {
    path: '/',
    metaTitle: 'The Paradise Group | DJ, Lighting & Sound in Carmel, IN',
    title: 'The Paradise Group: DJ, lighting and sound in Carmel, IN',
    description:
      'DJs, lighting, sound and show flow for bars, venue nights, birthdays, graduations and school dances. Based in Carmel, IN. Tell us your date for a quote.',
  },
  privateEvents: {
    path: '/private-events',
    metaTitle: 'Private Event DJ & Lighting in Carmel, IN',
    title: 'Private event DJ and lighting',
    description:
      'A live DJ, curated sets, lighting, quality audio and a PA for birthdays, graduations, school dances and reunions around Carmel and Indianapolis.',
  },
  nightlife: {
    path: '/nightlife',
    metaTitle: 'Nightlife DJ & Production for Bars and Venues',
    title: 'Nightlife DJ and production for bars and venues',
    description:
      'DJ sets, lighting, sound, show flow and promotion for bars and venues. From a Yatagarasu residency to 300+ guests at Ocean Sports Bar.',
  },
  team: {
    path: '/team',
    metaTitle: 'Our Team: DJs and Event Coordination',
    title: 'The team behind The Paradise Group',
    description:
      'Meet Coyer Paradise (owner and DJ), Dylan Delise (event coordinator) and Anthony Tambo (DJ and saxophonist) of The Paradise Group in Carmel, IN.',
  },
  contact: {
    path: '/contact',
    metaTitle: 'Get a Quote for Your Event',
    title: 'Get a quote from The Paradise Group',
    description:
      'Send your date, guest count and venue and we come back with a plan and a quote for DJ, lighting and sound. Bars, venues and private events in Carmel, IN.',
  },
};
