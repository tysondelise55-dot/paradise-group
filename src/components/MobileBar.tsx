import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { primaryAction, site } from '@/lib/data';

/* Phone-width action bar. The site publishes no phone number, so the second
   action is their Instagram, where they post their nights. */
export function MobileBar() {
  const ig = site.socials[0];
  return (
    <div className="mobile-bar">
      <a className="btn btn--ghost" href={ig.href} target="_blank" rel="noopener noreferrer">
        <Icon name="instagram" /> Instagram
      </a>
      <Link className="btn btn--primary" href={primaryAction.href}>
        {primaryAction.label}
      </Link>
    </div>
  );
}
