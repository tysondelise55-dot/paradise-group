'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { navItems, primaryAction, site } from '@/lib/data';
import { bindMagnetic, gsap, initMotion } from '@/lib/motion';

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const setMenu = useCallback((next: boolean) => {
    const menu = menuRef.current;
    if (!menu || next === openRef.current) return;
    openRef.current = next;
    setOpen(next);
    const html = document.documentElement;
    const anim = initMotion().animate;
    if (next) {
      menu.hidden = false;
      html.classList.add('menu-open');
      headerRef.current?.classList.remove('is-hidden');
      if (anim) {
        gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.42, ease: 'power4.out' });
        gsap.fromTo(
          menu.querySelectorAll('.mobile-menu__list a, .mobile-menu__foot > *'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.035, delay: 0.1, ease: 'power3.out' },
        );
      }
      menu.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
    } else {
      html.classList.remove('menu-open');
      const done = () => {
        if (!openRef.current) {
          menu.hidden = true;
          gsap.set(menu, { clearProps: 'clipPath' });
        }
      };
      if (anim) gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.26, ease: 'power2.out', onComplete: done });
      else done();
      // Hard backstop: never leave an invisible menu covering the page
      window.setTimeout(done, 600);
    }
  }, []);

  /* Scrolled state + hide on scroll down / show on scroll up */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    initMotion();
    const html = document.documentElement;
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 24);
      if (!html.classList.contains('menu-open')) {
        if (y > lastY && y > 320) header.classList.add('is-hidden');
        else if (y < lastY - 4 || y < 320) header.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    // Keyboard users tabbing into the header always see it
    const onFocus = () => header.classList.remove('is-hidden');
    window.addEventListener('scroll', onScroll, { passive: true });
    header.addEventListener('focusin', onFocus);
    update();
    const unMag = bindMagnetic(header);
    return () => {
      window.removeEventListener('scroll', onScroll);
      header.removeEventListener('focusin', onFocus);
      unMag();
    };
  }, []);

  /* Escape closes, Tab is trapped inside the open menu, wide screens close it */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!openRef.current) return;
      if (e.key === 'Escape') {
        setMenu(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current || !toggleRef.current) return;
      const items = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>('a[href], button')];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!items.includes(document.activeElement as HTMLElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 900) setMenu(false);
    };
    const onClose = () => setMenu(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    window.addEventListener('site:close-menu', onClose);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('site:close-menu', onClose);
    };
  }, [setMenu]);

  const close = () => setMenu(false);
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <div className="container site-header__inner">
          <Link className="brand" href="/" aria-label={`${site.name}, home`} onClick={close}>
            <Image src={site.logo.aqua.src} alt="" width={site.logo.aqua.width} height={site.logo.aqua.height} sizes="36px" loading="eager" />
            <span className="brand__name">{site.name}</span>
          </Link>
          <nav className="nav" aria-label="Primary">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav__link" aria-current={isActive(item.href) ? 'page' : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="btn btn--primary magnetic" href={primaryAction.href}>
              {primaryAction.label}
            </Link>
            <button
              ref={toggleRef}
              className="menu-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setMenu(!openRef.current)}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-menu" id="mobile-menu" ref={menuRef} hidden>
        <nav aria-label="Mobile">
          <ul className="mobile-menu__list">
            {[{ href: '/', label: 'Home' }, ...navItems].map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? 'page' : undefined} onClick={close}>
                  {item.label}
                  <Icon name="arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">
          <Link className="btn btn--primary btn--block" href={primaryAction.href} onClick={close}>
            {primaryAction.label}
          </Link>
          <div className="mobile-menu__socials">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
