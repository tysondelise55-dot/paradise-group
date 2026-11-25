import Image from 'next/image';
import { site } from '@/lib/data';

/* Scroll-velocity marquee (driven by PageMotion; CSS loop without GSAP).
   The second copy is aria-hidden so screen readers read the list once. */
export function Marquee({ items }: { items: readonly string[] }) {
  const group = (hidden: boolean) => (
    <ul className="marquee__group" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li className="marquee__item" key={t}>
          {t}
          <Image src={site.logo.aqua.src} alt="" width={22} height={22} sizes="22px" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" role="region" aria-label="What we cover">
      <div className="marquee__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
