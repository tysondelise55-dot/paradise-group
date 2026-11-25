'use client';

/* Page motion, adapted from the build-website template (GSAP "standard"):
   hero intros with split letters, hero photo parallax, the 300-guest count-up,
   the scroll-velocity marquee, the nightlife timeline line filling as you scroll,
   magnetic buttons. No preloader or page wipe at this level. Content is never
   hidden by CSS: initial states are set here, so without JS everything shows.
   Section heads and ordinary content stay static on scroll (taste.md). */

import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { bindMagnetic, gsap, initMotion, ScrollTrigger, useGSAP } from '@/lib/motion';

/* app/template.tsx only remounts when the top-level segment changes; keying by
   pathname remounts PageMotion (and re-runs the intro) on every route. */
export function RouteMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <PageMotion key={pathname}>{children}</PageMotion>;
}

export function PageMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const s = initMotion();
      const q = gsap.utils.selector(el);
      const has = (sel: string) => !!el.querySelector(sel);
      const cleanups: (() => void)[] = [];

      if (s.animate) {
        /* ---- Intro timelines (once, on load) ---- */
        if (has('.hero__title')) {
          const tl = gsap.timeline();
          tl.from(q('.hero__bg img'), { scale: 1.18, duration: 2.2, ease: 'power2.out' }, 0)
            .from(q('.hero__title .char'), { yPercent: 115, rotate: 6, duration: 0.95, stagger: 0.022, ease: 'power4.out' }, 0.2)
            .from(q('.hero__sub'), { y: 20, opacity: 0, duration: 0.8 }, 0.75)
            .from(q('.hero__ctas .btn'), { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.85)
            .from(q('.hero__meta span'), { opacity: 0, duration: 0.8, stagger: 0.08 }, 1.05);
        } else if (has('.page-hero__title')) {
          const tl = gsap.timeline();
          if (has('.page-hero__bg img')) tl.from(q('.page-hero__bg img'), { scale: 1.14, duration: 1.8, ease: 'power2.out' }, 0);
          tl.from(q('.page-hero__kicker'), { y: 14, opacity: 0, duration: 0.6 }, 0.05).from(
            q('.page-hero__title .char'),
            { yPercent: 115, rotate: 5, duration: 0.9, stagger: 0.025, ease: 'power4.out' },
            0.15,
          );
          if (has('.page-hero__intro, .page-hero .hero__ctas')) {
            tl.from(q('.page-hero__intro, .page-hero .hero__ctas'), { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.55);
          }
        }

        /* ---- Hero photo parallax (the image only, never text) ---- */
        const heroBg = q('.hero__bg, .page-hero__bg')[0];
        if (heroBg?.parentElement) {
          gsap.to(heroBg, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: { trigger: heroBg.parentElement, start: 'top top', end: 'bottom top', scrub: true },
          });
        }

        /* ---- Count-up: the real number is in the HTML; animates once in view ---- */
        q('[data-count]').forEach((n) => {
          const end = parseInt(n.getAttribute('data-count') || '0', 10) || 0;
          const suffix = n.getAttribute('data-suffix') || '';
          const o = { v: 0 };
          gsap.to(o, {
            v: end,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: n, start: 'top 90%', once: true },
            onStart: () => {
              n.textContent = `0${suffix}`;
            },
            onUpdate: () => {
              n.textContent = `${Math.round(o.v)}${suffix}`;
            },
          });
        });

        /* ---- Timeline line fills as you scroll through the nights ---- */
        const fill = q('.timeline__fill')[0];
        if (fill) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            { scaleY: 1, ease: 'none', scrollTrigger: { trigger: q('.timeline')[0], start: 'top 70%', end: 'bottom 60%', scrub: 0.4 } },
          );
        }

        /* ---- Marquee: GSAP-driven, speeds up with scroll velocity ---- */
        const track = q('.marquee__track')[0];
        if (track) {
          const mq = gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
          const boost = { v: 1 };
          ScrollTrigger.create({
            trigger: q('.marquee')[0],
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              const v = Math.min(Math.abs(self.getVelocity()) / 300, 5);
              gsap.to(boost, { v: 1 + v, duration: 0.2, overwrite: true, onUpdate: () => void mq.timeScale(boost.v) });
              gsap.to(boost, { v: 1, duration: 1.2, delay: 0.2, ease: 'power2.out', onUpdate: () => void mq.timeScale(boost.v) });
            },
          });
          cleanups.push(() => gsap.killTweensOf(boost));
        }
      }

      /* ---- Magnetic buttons (fine pointer, motion allowed) ---- */
      cleanups.push(bindMagnetic(el));

      /* ---- Recalculate trigger positions once layout settles ---- */
      const refresh = () => ScrollTrigger.refresh();
      const raf = requestAnimationFrame(refresh);
      document.fonts?.ready.then(refresh).catch(() => {});
      window.addEventListener('load', refresh);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener('load', refresh);
      });

      return () => cleanups.forEach((f) => f());
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
