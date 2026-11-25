import Image from 'next/image';
import Link from 'next/link';
import { Year } from '@/components/Year';
import { navItems, primaryAction, site } from '@/lib/data';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link className="brand" href="/" aria-label={`${site.name}, home`}>
              <Image src={site.logo.aqua.src} alt="" width={site.logo.aqua.width} height={site.logo.aqua.height} sizes="36px" />
              <span className="brand__name">{site.name}</span>
            </Link>
            <p>DJ, lighting and sound for bars, venues and private events. Based in Carmel, IN, booking Indy and beyond.</p>
            <Link className="btn btn--primary" href={primaryAction.href}>
              {primaryAction.label}
            </Link>
          </div>
          <div className="site-footer__col">
            <h2>Pages</h2>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__col">
            <h2>Follow</h2>
            <ul>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="site-footer__big" aria-hidden="true">
          {site.name}
        </p>
        <div className="site-footer__bottom">
          <p>
            © <Year /> {site.legalName}. All rights reserved.
          </p>
          <p>Carmel, Indiana</p>
        </div>
      </div>
    </footer>
  );
}
