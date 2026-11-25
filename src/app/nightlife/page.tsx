import Image from 'next/image';
import Link from 'next/link';
import { CtaBand } from '@/components/CtaBand';
import { Eq, Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { biggestNight, milestones, photos, primaryAction, services, site, venuePoints } from '@/lib/data';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata('nightlife');

export default function NightlifePage() {
  return (
    <>
      <PageHero
        kicker="Nightlife"
        title="DJ nights for bars and venues"
        intro="High-energy nights built for your room: DJ sets, lighting, sound, show flow and promotion, handled by one team from load-in to last call."
        image={photos.lasersWide}
      >
        <div className="hero__ctas">
          <Link className="btn btn--primary magnetic" href={primaryAction.href}>
            {primaryAction.label} <Icon name="arrow" />
          </Link>
          <a className="btn btn--ghost" href={site.linktree} target="_blank" rel="noopener noreferrer">
            See our socials <Icon name="external" />
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display h2">Everything the night needs</h2>
            <p className="lede">One team for the music, the lights and the flow of the night, so the bar only has to pour.</p>
          </div>
          <ul className="grid-3">
            {services.map((s, i) => (
              <li className="card" key={s.title}>
                <div className="card__top">
                  <span className="card__index">{String(i + 1).padStart(2, '0')}</span>
                  <Eq />
                </div>
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--raised">
        <div className="container split">
          <div className="split__media">
            <div className="frame">
              <Image src={photos.co2Cannon.src} alt={photos.co2Cannon.alt} width={photos.co2Cannon.width} height={photos.co2Cannon.height} sizes="(max-width: 860px) 100vw, 58vw" />
            </div>
          </div>
          <div className="split__copy">
            <h2 className="display h2">Built for venues and bars</h2>
            <ul className="points">
              {venuePoints.map((p) => (
                <li key={p.title}>
                  <h3 className="h3">{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display h2">Where the nights have taken us</h2>
            <p className="lede">A few nights that shaped who we are, and what we bring to your venue.</p>
          </div>
          <div className="timeline">
            <div className="timeline__line" aria-hidden="true">
              <div className="timeline__fill" />
            </div>
            <ol>
            {milestones.map((m) => (
              <li className="milestone" key={m.title}>
                <p className="milestone__when">{m.isoDate ? <time dateTime={m.isoDate}>{m.when}</time> : m.when}</p>
                <div className="milestone__body">
                  <h3 className="milestone__title">{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
            </ol>
          </div>
          <div className="bignum" style={{ marginTop: 'clamp(32px, 5vw, 64px)' }}>
            <p className="bignum__num" data-count={biggestNight.count} data-suffix="+">
              {biggestNight.count}+
            </p>
            <div className="bignum__copy">
              <h3 className="h3">Guests in one night at {biggestNight.venue}</h3>
              <p className="prose">Our biggest crowd yet, in {biggestNight.when}. The event photos on this site were taken there.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Book a night at your venue"
        text="Tell us about your venue and your date. We come back with a plan for the night."
        image={photos.booth}
        secondary={{ label: 'Follow on Instagram', href: site.socials[0].href, external: true }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Nightlife', path: '/nightlife' }])} />
    </>
  );
}
