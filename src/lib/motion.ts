'use client';

/* Shared motion state for the whole app (client only).
   Mirrors the top of the static site's js/main.js: drops the JS gate,
   records the session visit, and decides whether animation runs. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

declare global {
  interface Window {
    __siteFailsafe?: ReturnType<typeof setTimeout>;
  }
}

let registered = false;
export function registerGsap() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);
  gsap.defaults({ ease: 'power3.out', duration: 1 });
  registered = true;
}

export type MotionState = {
  /** GSAP animations allowed (no reduced motion, failsafe hasn't fired) */
  animate: boolean;
  reduce: boolean;
  finePointer: boolean;
  /** First page of this browser session: the preloader plays */
  firstVisit: boolean;
  /** Full page load on a later visit in the session: short enter wipe */
  enterOnLoad: boolean;
  /** True until the first page has consumed the initial intro delay */
  initialPending: boolean;
  /** Set by TransitionLink when the exit wipe covered the screen */
  pendingEnter: boolean;
};

let state: MotionState | null = null;

/** Idempotent. Call from any client effect before animating. */
export function initMotion(): MotionState {
  if (state) return state;
  registerGsap();
  const html = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lateLoad = html.classList.contains('no-anim'); // the head failsafe already fired
  const animate = !reduce && !lateLoad;

  if (window.__siteFailsafe) clearTimeout(window.__siteFailsafe);
  if (!animate) html.classList.add('no-anim');
  html.classList.add('is-ready');
  try {
    sessionStorage.setItem('site-visited', '1');
  } catch {
    /* storage blocked: fine */
  }

  const firstVisit = html.classList.contains('pt-first') && animate;
  const enterOnLoad = !firstVisit && html.classList.contains('pt-enter') && animate;
  if (!firstVisit) html.classList.remove('pt-first');
  if (!enterOnLoad) html.classList.remove('pt-enter');

  state = { animate, reduce, finePointer, firstVisit, enterOnLoad, initialPending: true, pendingEnter: false };
  return state;
}

export function getWipe() {
  const wipe = document.querySelector<HTMLElement>('.page-wipe');
  return {
    wipe,
    panel: wipe?.querySelector<HTMLElement>('.page-wipe__panel') ?? null,
    mark: wipe?.querySelector<HTMLElement>('.page-wipe__mark') ?? null,
  };
}

/* ---- Page wipe ------------------------------------------------------------
   Every step that matters (routing, removing the overlay) is backed by a plain
   setTimeout, never only by a GSAP onComplete: GSAP ticks on
   requestAnimationFrame, which browsers pause in hidden tabs and throttle on
   busy phones, and a stalled tween must never leave the overlay up. */

type Nav = { token: number; href: string; from: string; hard?: ReturnType<typeof setTimeout> };
let nav: Nav | null = null;
let navToken = 0;
let wipeTl: gsap.core.Timeline | null = null;
let enterTimer: ReturnType<typeof setTimeout> | undefined;
let entering = false;

const here = () => window.location.pathname + window.location.search;

/** True while the overlay covers (or is covering) the screen. */
export function isWipeActive(): boolean {
  const { wipe } = getWipe();
  return !!wipe?.classList.contains('is-active') || document.documentElement.classList.contains('pt-enter');
}

/** Removes the overlay immediately and cancels any pending wipe navigation. */
export function clearWipe(): void {
  const { wipe, panel, mark } = getWipe();
  wipeTl?.kill();
  wipeTl = null;
  if (enterTimer) clearTimeout(enterTimer);
  if (nav?.hard) clearTimeout(nav.hard);
  nav = null;
  entering = false;
  document.documentElement.classList.remove('pt-enter');
  wipe?.classList.remove('is-active');
  if (panel && mark) gsap.set([panel, mark], { clearProps: 'all' });
}

/** Cancels a navigation that is still waiting for its exit wipe (back/forward pressed mid-wipe). */
export function cancelPendingNav(): void {
  navToken++;
  if (state) state.pendingEnter = false;
  clearWipe();
}

/** Plays the page-enter wipe (panel slides up and away), with a hard timeout. Idempotent. */
export function playEnterWipe(): void {
  const { wipe, panel, mark } = getWipe();
  if (!wipe || !panel || !mark) return;
  if (entering) return;
  entering = true;
  if (nav?.hard) clearTimeout(nav.hard);
  nav = null;
  wipeTl?.kill();
  wipeTl = gsap
    .timeline({ onComplete: clearWipe })
    .to(mark, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' }, 0)
    .to(panel, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, 0.1);
  if (enterTimer) clearTimeout(enterTimer);
  enterTimer = setTimeout(clearWipe, 1600);
}

/** Exit wipe for internal navigation: the panel slides up to cover, then
    `done` runs once, on the tween's completion or after a timer, whichever
    comes first. Skipped if the navigation was cancelled meanwhile. */
export function playExitWipe(done: () => void): void {
  const { wipe, panel, mark } = getWipe();
  const token = ++navToken;
  let fired = false;
  const run = () => {
    if (fired || token !== navToken) return;
    fired = true;
    done();
  };
  if (!wipe || !panel || !mark) {
    run();
    return;
  }
  if (enterTimer) clearTimeout(enterTimer);
  entering = false;
  wipe.classList.add('is-active');
  wipeTl?.kill();
  wipeTl = gsap
    .timeline({ onComplete: run })
    .fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: 'power4.inOut' }, 0)
    .fromTo(mark, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3 }, 0.35);
  setTimeout(run, 750);
}

/** Routes with `push` behind the wipe. If the URL hasn't changed after a few
    seconds (push failed, chunk error, stalled fetch) it falls back to a full
    page load; if it has changed but the overlay is somehow still up, it clears it. */
export function navigateBehindWipe(href: string, push: (href: string) => void): void {
  const target = new URL(href, window.location.href);
  const from = here();
  if (nav?.hard) clearTimeout(nav.hard);
  nav = { token: navToken, href: target.href, from };
  const hardLoad = () => {
    clearWipe();
    window.location.assign(target.href);
  };
  nav.hard = setTimeout(() => {
    if (here() === from && target.pathname + target.search !== from) hardLoad();
    else clearWipe();
  }, 5000);
  try {
    push(href);
  } catch {
    hardLoad();
  }
}

/** Called on every pathname change: lifts the overlay if it's still covering. */
export function onRouteSettled(): void {
  if (!isWipeActive()) return;
  if (state?.animate) playEnterWipe();
  else clearWipe();
}

/** Magnetic hover for every `.magnetic` inside root. Returns a cleanup. */
export function bindMagnetic(root: ParentNode): () => void {
  const s = initMotion();
  if (!s.finePointer || s.reduce) return () => {};
  const offs: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
    const strength = el.classList.contains('site-footer__big') ? 0.1 : 0.35;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, .4)', overwrite: true });
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    offs.push(() => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'transform' });
    });
  });
  return () => offs.forEach((f) => f());
}

export { gsap, ScrollTrigger, useGSAP };
