import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { site } from '@/lib/data';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata('contact');

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Get a quote for your event"
        intro="Planning a party or a night at your venue? Send your contact details and the event specifics, and we come back with a plan and a price."
      />

      <section className="section">
        <div className="container contact-grid">
          <ContactForm />
          <aside className="aside" aria-label="More ways to reach us">
            <div className="aside__block">
              <h2 className="h3">What happens next</h2>
              <ol className="steps">
                <li>We read your date, guest count and venue.</li>
                <li>We check the room: our equipment, or your house system.</li>
                <li>You get a plan for the night and a quote based on size, length and gear.</li>
              </ol>
            </div>
            <div className="aside__block">
              <h2 className="h3">Where we work</h2>
              <p className="prose">
                <Icon name="pin" className="inline-icon" /> Based in Carmel, IN, booking venues and bars across Indy and beyond.
              </p>
            </div>
            <div className="aside__block">
              <h2 className="h3">Message us on social</h2>
              <ul className="social-list">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label} <span>{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Contact', path: '/contact' }])} />
    </>
  );
}
