'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { bindMagnetic, cancelPendingNav, clearWipe, gsap, initMotion, onRouteSettled } from '@/lib/motion';

/* Layout-level behaviour that isn't tied to one page:
   - smooth same-page anchor scrolling (ScrollToPlugin), delegated so it
     works for links rendered by any page
   - magnetic footer phone number
   - wipe backstops: the overlay is lifted on every pathname change, on
     back/forward (popstate, which also cancels a navigation still waiting
     for its exit wipe) and on bfcache restore */
export function SiteEffects() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  // Runs after the new route has committed. PageMotion normally plays the
  // enter wipe itself; this catches anything that slipped through.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const t = setTimeout(onRouteSettled, 50);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const s = initMotion();
    const html = document.documentElement;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href') || '';
      if (id.length < 2) return;
      const target = id === '#top' ? document.body : document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      const wasOpen = html.classList.contains('menu-open');
      window.dispatchEvent(new Event('site:close-menu'));
      const y = id === '#top' ? 0 : target.getBoundingClientRect().top + window.pageYOffset - 70;
      if (!s.reduce) {
        gsap.to(window, { scrollTo: { y, autoKill: true }, duration: 1.2, ease: 'power3.inOut', delay: wasOpen ? 0.3 : 0 });
      } else {
        window.scrollTo(0, y);
      }
      if (id !== '#top') {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    };
    document.addEventListener('click', onClick);

    const footer = document.querySelector('.site-footer');
    const unMag = footer ? bindMagnetic(footer) : () => {};

    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) clearWipe();
    };
    window.addEventListener('pageshow', onShow);
    window.addEventListener('popstate', cancelPendingNav);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', onShow);
      window.removeEventListener('popstate', cancelPendingNav);
      unMag();
    };
  }, []);

  return null;
}
