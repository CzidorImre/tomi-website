'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/data/site';
import { startScroll, stopScroll } from '@/engine';
import { BrandMark, Cta } from './Cta';

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const current = (href: string) => (path === href || (href !== '/' && path.startsWith(href)) ? 'page' : undefined);

  // Close on navigation.
  useEffect(() => { setOpen(false); }, [path]);

  // Focus trap, Escape, scroll lock while the menu is open.
  useEffect(() => {
    if (!open) return;
    stopScroll();
    const root = menu.current!;
    root.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); return; }
      if (e.key !== 'Tab') return;
      const items = [...root.querySelectorAll<HTMLElement>('a, button')];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); startScroll(); };
  }, [open]);

  return (
    <>
      <header className="header">
        <Link href="/" className="brand" aria-label={`${site.name}, home`} data-label="Local SEO">
          <BrandMark />
          <span className="brand__name">Get Effective<br />Marketing</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <ul className="nav__list">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="nav__link" aria-current={current(n.href)} data-label={n.label}>
                  <span className="nav__dot" aria-hidden="true" />
                  <span className="roll"><span>{n.label}</span><span aria-hidden="true">{n.label}</span></span>
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.phoneHref} className="header__phone">{site.phone}</a>
          <Cta label="Free ranking check" />
          <button ref={btn} className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>Menu</button>
        </nav>
      </header>
      <div id="menu" ref={menu} className="menu" hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
        <button className="menu__close" onClick={() => { setOpen(false); btn.current?.focus(); }}>Close</button>
        <ul className="menu__list display">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} aria-current={current(n.href)} onClick={() => setOpen(false)}>{n.label}</Link>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <a href={site.phoneHref} className="h-m num">{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Cta label={site.cta} light />
        </div>
      </div>
    </>
  );
}
