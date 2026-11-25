import { guestSizes, quoteEventTypes, site } from '@/lib/data';

/* Quote form handler.
   - validates server-side, drops honeypot submissions, rate-limits per IP
   - delivers through Formspree (FORMSPREE_ENDPOINT, what the current site uses)
     or Resend (RESEND_API_KEY + CONTACT_TO_EMAIL); with neither set it logs the
     lead and still answers ok (demo mode). See .env.example. */

type Body = Record<string, unknown>;
const str = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
const oneOf = <T extends readonly string[]>(list: T, v: string) => ((list as readonly string[]).includes(v) ? v : '');

// In-memory rate limit: 5 submissions per IP per 15 minutes (per server instance)
const WINDOW = 15 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function limited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object') return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });

  // Honeypot: pretend success, send nothing
  if (str(body.website)) return Response.json({ ok: true });

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (limited(ip, Date.now())) {
    return Response.json({ ok: false, error: 'Too many requests in a short time. Try again in a few minutes.' }, { status: 429 });
  }

  const lead = {
    firstName: str(body.firstName, 80),
    lastName: str(body.lastName, 80),
    mobile: str(body.mobile, 20),
    email: str(body.email, 200),
    eventType: oneOf(quoteEventTypes, str(body.eventType)),
    guests: oneOf(guestSizes, str(body.guests)),
    date: /^\d{4}-\d{2}-\d{2}$/.test(str(body.date)) ? str(body.date) : '',
    venue: str(body.venue, 160),
    message: str(body.message, 4000),
  };

  const errors: Record<string, string> = {};
  const d = lead.mobile.replace(/\D/g, '');
  if (d.length < 10 || d.length > 11) errors.mobile = 'Enter a mobile number with area code, like 317 555 0123.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.email = 'Enter an email address, like name@example.com.';
  if (!lead.guests) errors.guests = 'Choose roughly how many guests you expect.';
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors, error: 'Check the highlighted fields and send again.' }, { status: 400 });
  }

  const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Website visitor';
  const subject = `Quote request: ${lead.eventType || 'Event'}, ${lead.guests} guests, from ${name}`;
  const rows: [string, string][] = (
    [
      ['Name', name],
      ['Mobile', lead.mobile],
      ['Email', lead.email],
      ['Event type', lead.eventType],
      ['Expected guests', lead.guests],
      ['Date', lead.date],
      ['Venue or town', lead.venue],
      ['Message', lead.message],
    ] as [string, string][]
  ).filter(([, v]) => v);
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const formspree = process.env.FORMSPREE_ENDPOINT;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  try {
    if (formspree) {
      const res = await fetch(formspree, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ _subject: subject, _replyto: lead.email, ...Object.fromEntries(rows) }),
      });
      if (!res.ok) throw new Error(`Formspree ${res.status}`);
      return Response.json({ ok: true, delivered: true });
    }
    if (resendKey && to) {
      const html = `<h2 style="font-family:sans-serif">Quote request from the ${esc(site.name)} website</h2><table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">${rows
        .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#555;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
        .join('')}</table>`;
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || `${site.name} Website <onboarding@resend.dev>`,
          to: to.split(',').map((s) => s.trim()).filter(Boolean),
          reply_to: lead.email,
          subject,
          html,
          text,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
      return Response.json({ ok: true, delivered: true });
    }
  } catch (e) {
    console.error('[contact] delivery failed', e);
    return Response.json({ ok: false, error: 'Your request could not be delivered. Try again in a minute.' }, { status: 502 });
  }

  console.info(`[contact] Demo mode (no FORMSPREE_ENDPOINT or RESEND_API_KEY set). ${subject}\n${text}`);
  return Response.json({ ok: true, delivered: false });
}
