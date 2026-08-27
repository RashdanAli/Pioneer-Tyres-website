'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { nav, whatsappUrl } from '@/lib/site';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-ink-950/95 md:bg-ink-950/80 md:backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-gradient-to-b from-ink-950/60 to-transparent',
        ].join(' ')}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center" aria-label="CeyhedgesLanka — Home">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-bone-100/85 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-ember-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn-primary text-sm !py-2.5 !min-h-[42px]">
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp Quote
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] text-white"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="sr-only">Toggle menu</span>
            <div className="relative w-4 h-4">
              <span className={`absolute inset-x-0 top-1 h-px bg-white transition-all duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`absolute inset-x-0 top-[7px] h-px bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute inset-x-0 top-[13px] h-px bg-white transition-all duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={[
          'fixed inset-0 z-40 md:hidden transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-ink-950/98 md:backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div
          className={[
            'absolute inset-x-0 top-0 pt-24 pb-10 px-6 transition-transform duration-500',
            open ? 'translate-y-0' : '-translate-y-4',
          ].join(' ')}
        >
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-white/[0.06] text-2xl font-display text-white"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {item.label}
                  <span className="text-ember-500">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary w-full mt-8"
          >
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp us
          </a>
        </div>
      </div>
    </>
  );
}

export function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.5 3.5A11.86 11.86 0 0 0 12.04 0C5.47 0 .13 5.34.13 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.31-1.65a11.88 11.88 0 0 0 5.72 1.46h.01c6.57 0 11.91-5.34 11.92-11.91a11.83 11.83 0 0 0-3.46-8.4ZM12.04 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-3.75.98 1-3.66-.24-.38a9.86 9.86 0 0 1-1.51-5.24c0-5.46 4.44-9.9 9.91-9.9 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 0 1 2.9 7.01c0 5.46-4.44 9.9-9.91 9.9Zm5.44-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.11 3.23 5.12 4.53.72.31 1.27.5 1.71.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
