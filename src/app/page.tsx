import Image from 'next/image';
import Link from 'next/link';
import { CtaBand } from '@/components/CtaBand';
import { Eq, Icon } from '@/components/Icon';
import { Marquee } from '@/components/Marquee';
import { SplitLine } from '@/components/SplitLine';
import { biggestNight, eventTypes, milestones, photos, primaryAction, services, site, team } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata('home');

const venueNights = milestones.filter((m) => m.isoDate && m.title !== 'Launched in Carmel, IN');

export default function HomePage() {
  const hero = photos.co2Stage;
  return (
    <>
      <section className="hero">
        <div className="hero__bg">
          <Image src={hero.src} alt="" width={hero.width} height={hero.height} sizes="(max-width: 600px) 300vw, (max-width: 1100px) 200vw, 100vw" loading="eager" fetchPriority="high" />
        </div>
        <div className="container hero__content">
          <h1 className="display hero__title" aria-label="DJ, lights and sound in Carmel, IN">
            <SplitLine text="DJ, lights and sound in" className="hero__line" /> <SplitLine text="Carmel, IN" className="hero__line accent" />
          </h1>
          <p className="hero__sub">
            One crew for the music, the lighting, the sound and the run of the night. We bring the gear for your room, or plug into the system you already have.
          </p>
          <div className="hero__ctas">
            <Link className="btn btn--primary magnetic" href={primaryAction.href}>
              {primaryAction.label} <Icon name="arrow" />
            </Link>
            <Link className="btn btn--ghost" href="/nightlife">
              See our venue nights
            </Link>
          </div>
          <p className="hero__meta">
            <span>Based in Carmel, IN</span>
            <span>
              {biggestNight.count}+ guests at {biggestNight.venue}
            </span>
            <span>Booking Indy and beyond</span>
          </p>
        </div>
      </section>

      <Marquee items={[...services.map((s) => s.title), ...eventTypes]} />

      <section className="section">
        <div className="container split">
          <div className="split__media">
            <div className="frame">
              <Image src={photos.booth.src} alt={photos.booth.alt} width={photos.booth.width} height={photos.booth.height} sizes="(max-width: 860px) 100vw, 58vw" />
            </div>
          </div>
          <div className="split__copy">
            <h2 className="display h2">Our equipment or your house system</h2>
            <div className="prose">
              <p>
                We can supply every piece of equipment your space needs, and that is how we prefer to work. If your venue already has a system, we adapt to it.
              </p>
              <p>Either way we work hand in hand with your venue, your staff and any other performers, so the night runs around what your business does best.</p>
            </div>
            <Link className="link" href="/private-events">
              See what every event includes <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--raised">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display h2">Two ways to book the crew</h2>
            <p className="lede">Bars and venues book us for nights that keep the floor full. Hosts book us for the party they are planning.</p>
          </div>
          <div className="paths">
            <Link className="card card--link path" href="/nightlife">
              <div className="frame">
                <Image src={photos.lasers.src} alt={photos.lasers.alt} width={photos.lasers.width} height={photos.lasers.height} sizes="(max-width: 760px) 100vw, 50vw" />
              </div>
              <div className="path__body">
                <div className="card__top">
                  <h3 className="h3">Nightlife for bars and venues</h3>
                  <Eq />
                </div>
                <p>DJ sets, lighting, sound, show flow and promotion for theme nights and full venue takeovers.</p>
                <span className="path__go">
                  See nightlife <Icon name="arrow" />
                </span>
              </div>
            </Link>
            <Link className="card card--link path" href="/private-events">
              <div className="frame">
                <Image src={photos.outside.src} alt={photos.outside.alt} width={photos.outside.width} height={photos.outside.height} sizes="(max-width: 760px) 100vw, 50vw" />
              </div>
              <div className="path__body">
                <div className="card__top">
                  <h3 className="h3">DJ and lighting for private events</h3>
                  <Eq />
                </div>
                <ul className="path__list" aria-label="Events we cover">
                  {eventTypes.map((t) => (
                    <li className="chip" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="path__go">
                  See private events <Icon name="arrow" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display h2">Rooms we have filled</h2>
            <p className="lede">From a ramen bar residency to a 300-guest night, these are the venues that book the crew.</p>
          </div>
          <ul className="venues">
            {venueNights.map((m) => (
              <li className="venue" key={m.title}>
                <span className="venue__name">{m.title}</span>
                <span className="venue__when">{m.when}</span>
              </li>
            ))}
          </ul>
          <div className="bignum" style={{ marginTop: 'clamp(32px, 5vw, 64px)' }}>
            <p className="bignum__num" data-count={biggestNight.count} data-suffix="+">
              {biggestNight.count}+
            </p>
            <div className="bignum__copy">
              <h3 className="h3">Guests in one night at {biggestNight.venue}</h3>
              <p className="prose">Our biggest crowd so far, in {biggestNight.when}, with our sound, lighting, lasers and CO2 jets running the room.</p>
              <Link className="link" href="/nightlife">
                See the full timeline <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display h2">Nights at Ocean Sports Bar</h2>
            <p className="lede">Lasers, haze, CO2 and a crowd with its hands up. This is what a Paradise Group night looks like from the floor.</p>
          </div>
          <div className="mosaic">
            {[photos.co2Cannon, photos.handsUp, photos.dancefloor, photos.lasersWide].map((p, i) => (
              <div className="frame" key={p.src}>
                <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes={i % 3 === 0 ? '(max-width: 700px) 100vw, 58vw' : '(max-width: 700px) 100vw, 42vw'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--raised">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display h2">The crew behind the decks</h2>
            <p className="lede">Two DJs and an event coordinator, working out of Carmel and Bloomington, IN.</p>
          </div>
          <div className="team-grid">
            {team.map((m) => (
              <Link className="card card--link member" href={`/team#${m.slug}`} key={m.slug}>
                <div className="frame">
                  <Image src={m.photo.src} alt={m.photo.alt} width={m.photo.width} height={m.photo.height} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                </div>
                <div className="member__body">
                  <h3 className="h3">{m.name}</h3>
                  <p className="member__role">{m.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell us the date and the room"
        text="Send your date, your guest count and your venue. We come back with a plan for the night and a quote."
        image={photos.haze}
        secondary={{ label: 'Follow on Instagram', href: site.socials[0].href, external: true }}
      />
    </>
  );
}
