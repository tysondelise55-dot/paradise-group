import Image from 'next/image';
import Link from 'next/link';
import { SplitLine } from '@/components/SplitLine';
import type { Img } from '@/lib/data';

type Props = { kicker: string; title: string; intro?: string; image?: Img; position?: string; children?: React.ReactNode };

/* Inner-page hero: photo background (or plain), split-letter title. */
export function PageHero({ kicker, title, intro, image, position, children }: Props) {
  return (
    <section className={`page-hero${image ? '' : ' page-hero--plain'}`}>
      {image ? (
        <div className="page-hero__bg">
          <Image src={image.src} alt="" width={image.width} height={image.height} sizes="(max-width: 600px) 300vw, (max-width: 1100px) 170vw, 100vw" loading="eager" style={position ? { objectPosition: position } : undefined} />
        </div>
      ) : null}
      <div className="container page-hero__inner">
        <nav className="crumbs page-hero__kicker" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">{kicker}</li>
          </ol>
        </nav>
        <h1 className="display page-hero__title" aria-label={title}>
          <SplitLine text={title} className="page-hero__split" />
        </h1>
        {intro ? <p className="page-hero__intro">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}
