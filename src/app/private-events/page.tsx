import Image from 'next/image';
import Link from 'next/link';
import { CtaBand } from '@/components/CtaBand';
import { Eq, Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { eventTypes, included, photos, pricing, primaryAction, site } from '@/lib/data';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata('privateEvents');

export default function PrivateEventsPage() {
  return (
    <>
      <PageHero
        kicker="Private events"
        title="DJ and lighting for your party"
        intro="Birthdays, graduations, school dances and reunions around Carmel. A live DJ, real lighting and proper sound, set up and run by one crew."
        image={photos.dancefloor}
        position="50% 45%"
      >
        <div className="hero__ctas">
          <Link className="btn btn--primary magnetic" href={primaryAction.href}>
            {primaryAction.label} <Icon name="arrow" />
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container split split--flip">
          <div className="split__media">
            <div className="frame">
              <Image src={photos.outside.src} alt={photos.outside.alt} width={photos.outside.width} height={photos.outside.height} sizes="(max-width: 860px) 100vw, 58vw" />
            </div>
          </div>
          <div className="split__copy">
            <h2 className="display h2">A DJ and production crew from Carmel</h2>
            <div className="prose">
              <p>
                We cover several sides of production and entertainment at once: the music, the lighting and the atmosphere. That means one booking instead of a DJ, a lighting rental and a sound company.
              </p>
              <p>We work hand in hand with your venue, performers and team, so our setup fits around your event rather than the other way round.</p>
            </div>
            <Link className="link" href="/team">
              Meet the team <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--raised">
        <div className="container">
          <div className="section-head">
            <h2 className="display h2">Events we cover</h2>
            <p className="lede">The parties we are booked for most. Planning something else? Ask us.</p>
          </div>
          <ul className="types">
            {eventTypes.map((t) => (
              <li key={t}>
                <Image src={site.logo.aqua.src} alt="" width={26} height={26} sizes="26px" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--raised">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display h2">What every event includes</h2>
            <p className="lede">Every plan comes with these five things, whatever the size of the party.</p>
          </div>
          <ul className="grid-3">
            {included.map((item) => (
              <li className="card" key={item.title}>
                <div className="card__top">
                  <h3 className="h3">{item.title}</h3>
                  <Eq />
                </div>
                <p>{item.text}</p>
              </li>
            ))}
            <li className="card">
              <h3 className="h3">Your price</h3>
              <p>{pricing}</p>
              <Link className="link" href={primaryAction.href} style={{ marginTop: 'auto' }}>
                {primaryAction.label} <Icon name="arrow" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand
        title="Book the DJ for your date"
        text="Tell us the date, the guest count and the venue, and we send a plan and a quote."
        image={photos.handsUp}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Private events', path: '/private-events' }])} />
    </>
  );
}
