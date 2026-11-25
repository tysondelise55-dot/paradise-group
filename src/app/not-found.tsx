import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { primaryAction } from '@/lib/data';

export default function NotFound() {
  return (
    <section className="container nf">
      <p className="display nf__code" aria-hidden="true">
        404
      </p>
      <h1 className="display h2">This page left the party</h1>
      <p className="lede">The link may be old or mistyped. Head back to the home page, or send us your event details.</p>
      <div className="hero__ctas">
        <Link className="btn btn--primary" href="/">
          Go to the home page <Icon name="arrow" />
        </Link>
        <Link className="btn btn--ghost" href={primaryAction.href}>
          {primaryAction.label}
        </Link>
      </div>
    </section>
  );
}
