import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { photos, primaryAction, type Img } from '@/lib/data';

type Props = { title: string; text: string; image?: Img; secondary?: { label: string; href: string; external?: boolean } };

export function CtaBand({ title, text, image = photos.lasersWide, secondary }: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band">
          <div className="cta-band__bg">
            <Image src={image.src} alt="" width={image.width} height={image.height} sizes="(max-width: 700px) 220vw, (max-width: 1300px) 100vw, 1240px" />
          </div>
          <div className="cta-band__inner">
            <h2 className="display h2">{title}</h2>
            <p className="lede">{text}</p>
            <div className="hero__ctas">
              <Link className="btn btn--primary magnetic" href={primaryAction.href}>
                {primaryAction.label} <Icon name="arrow" />
              </Link>
              {secondary ? (
                secondary.external ? (
                  <a className="btn btn--ghost" href={secondary.href} target="_blank" rel="noopener noreferrer">
                    {secondary.label} <Icon name="external" />
                  </a>
                ) : (
                  <Link className="btn btn--ghost" href={secondary.href}>
                    {secondary.label}
                  </Link>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
