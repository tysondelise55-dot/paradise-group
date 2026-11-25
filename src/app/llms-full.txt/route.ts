import { eventTypes, included, milestones, pageMeta, pricing, services, site, team, venuePoints } from '@/lib/data';
import { abs } from '@/lib/seo';

/* Full plain-text summary for AI assistants, generated from data.ts so it never
   drifts from the site. Static: built once at build time. */
export function GET() {
  const body = `# ${site.name} (${site.legalName})

> ${site.description}

- Website: ${abs('/')}
- Based in: ${site.city}, ${site.regionName}. Works across ${site.areas.join(', ')} ("Indy and beyond").
- Get a quote: ${abs('/contact')} (form: name, mobile, email, event type, expected guests, date, venue, message)
- No phone number or email address is published; use the quote form or social media.
- Social: ${site.socials.map((s) => `${s.label} ${s.href}`).join(' | ')} | Linktree ${site.linktree}

## Pages
${Object.values(pageMeta)
  .map((m) => `- ${m.title}: ${abs(m.path)}`)
  .join('\n')}

## Nightlife services (bars and venues)
${services.map((s) => `- ${s.title}: ${s.text}`).join('\n')}

Why venues book them:
${venuePoints.map((p) => `- ${p.title}: ${p.text}`).join('\n')}

## Private events
Events covered: ${eventTypes.join(', ')}, and other parties on request.
Every event includes:
${included.map((i) => `- ${i.title}: ${i.text}`).join('\n')}
Pricing: ${pricing}

## Timeline
${milestones.map((m) => `- ${m.when}: ${m.title}. ${m.text}`).join('\n')}

## Team
${team.map((m) => `- ${m.name}, ${m.role}. ${m.bio.join(' ')}${m.link ? ` (${m.link.href})` : ''}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
