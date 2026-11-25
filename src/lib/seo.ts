import type { Metadata } from 'next';
import { eventTypes, pageMeta, services, site, team, type PageKey } from '@/lib/data';

/* One source of truth for absolute URLs. Set NEXT_PUBLIC_SITE_URL for
   preview hosts (no trailing slash); production uses the real domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/+$/, '');
export const SITE_NAME = site.name;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const abs = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

/* Metadata merges shallowly: a page's openGraph replaces the parent's and would
   drop the file-based share image, so it is listed on every page. */
export const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: `${SITE_NAME}: ${site.tagline}`, type: 'image/png' };

export function buildMetadata(key: PageKey): Metadata {
  const m = pageMeta[key];
  return {
    title: key === 'home' ? { absolute: m.metaTitle } : m.metaTitle,
    description: m.description,
    alternates: { canonical: m.path },
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_US', title: m.title, description: m.description, url: m.path, images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [OG_IMAGE.url] },
  };
}

/* ---- JSON-LD ------------------------------------------------------------- */

export function businessJsonLd() {
  return {
    '@type': 'EntertainmentBusiness',
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    url: abs('/'),
    logo: abs(site.logo.aqua.src),
    image: abs('/images/events/co2-jet-stage.jpg'),
    description: site.description,
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.region, addressCountry: 'US' },
    areaServed: site.areas.map((a) => ({ '@type': 'City', name: a })),
    sameAs: [...site.socials.map((s) => s.href), site.linktree],
    founder: { '@type': 'Person', name: team[0].name },
    employee: team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role })),
    knowsAbout: ['DJ services', 'Event lighting', 'Event sound', 'Event production', 'Nightlife events'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'DJ, lighting and event production',
      itemListElement: [
        ...services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.text, url: abs('/nightlife') } })),
        ...eventTypes.map((e) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `DJ and lighting for ${e.toLowerCase()}`, url: abs('/private-events') } })),
      ],
    },
  };
}

export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      businessJsonLd(),
      { '@type': 'WebSite', '@id': WEBSITE_ID, url: abs('/'), name: SITE_NAME, publisher: { '@id': BUSINESS_ID }, inLanguage: 'en-US' },
    ],
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
