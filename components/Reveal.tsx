'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll<HTMLElement>('.reveal');

    if (prefersReduced) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // Reveal anything already in the viewport immediately, observe the rest.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );

    els.forEach((el) => {
      if (el.classList.contains('is-visible')) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
      if (inView) {
        el.classList.add('is-visible');
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [pathname]);

  // Make sure body scroll is never left locked after a route change
  // (mobile menu handles its own state but this is a safety net).
  useEffect(() => {
    document.body.style.overflow = '';
  }, [pathname]);

  return null;
}
