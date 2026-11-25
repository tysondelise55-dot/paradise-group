import Image from 'next/image';
import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { photos, team } from '@/lib/data';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata('team');

export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker="Our team"
        title="The crew behind the decks"
        intro="Two DJs and an event coordinator. They play the room in front of them, and they handle everything between load-in and last call."
      />

      <section className="section">
        <div className="container">
          {team.map((m, i) => (
            <article className="profile" id={m.slug} key={m.slug}>
              <div className="frame">
                <Image
                  src={m.photo.src}
                  alt={m.photo.alt}
                  width={m.photo.width}
                  height={m.photo.height}
                  sizes="(max-width: 800px) 100vw, 40vw"
                  loading={i === 0 ? 'eager' : undefined}
                />
              </div>
              <div className="profile__copy">
                <div className="profile__head">
                  <h2 className="display profile__name">{m.name}</h2>
                  <p className="member__role">{m.role}</p>
                </div>
                <div className="prose">
                  {m.bio.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {m.quote ? (
                  <blockquote className="quote">
                    <p>“{m.quote}”</p>
                    <cite>{m.name}</cite>
                  </blockquote>
                ) : null}
                {m.link ? (
                  <a className="link" href={m.link.href} target="_blank" rel="noopener noreferrer">
                    {m.link.label} <Icon name="external" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Book the crew for your night" text="Send the date, the guest count and the venue, and we come back with a plan and a quote." image={photos.booth} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Team', path: '/team' }])} />
    </>
  );
}
