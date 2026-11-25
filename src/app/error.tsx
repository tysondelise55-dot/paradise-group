'use client';

import Link from 'next/link';
import { site } from '@/lib/data';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container nf">
      <h1 className="display h2">Something went wrong on this page</h1>
      <p className="lede">Try loading it again. If it keeps happening, message us on Instagram and we will sort out your booking there.</p>
      <div className="hero__ctas">
        <button className="btn btn--primary" type="button" onClick={reset}>
          Try again
        </button>
        <a className="btn btn--ghost" href={site.socials[0].href} target="_blank" rel="noopener noreferrer">
          Message us on Instagram
        </a>
        <Link className="btn btn--ghost" href="/">
          Go to the home page
        </Link>
      </div>
    </section>
  );
}
