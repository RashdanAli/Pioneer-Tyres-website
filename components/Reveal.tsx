'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-mask, .reveal-rule, .reveal-card, .reveal-blur',
    );

    const showAll = () => els.forEach((el) => el.classList.add('is-visible'));

    if (prefersReduced) {
      showAll();
      return;
    }

    /* Failure mode this guards against: every reveal target starts at
       opacity:0, so if the reveal logic cannot run correctly the page is
       BLANK — the worst possible outcome. Two safeguards below. */

    // 1. Degenerate viewport (hidden tab, embedded frame, some mobile
    //    states report 0) or no IntersectionObserver: show everything now
    //    rather than gambling on geometry we can't trust.
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;
    if (!vh || typeof IntersectionObserver === 'undefined') {
      showAll();
      return;
    }

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
      const inView = rect.top < vh * 0.95 && rect.bottom > 0;
      if (inView) {
        el.classList.add('is-visible');
      } else {
        io.observe(el);
      }
    });

    // 2. Last-resort net: whatever is still hidden after 3s gets revealed.
    //    If the observer never fires for any reason, content still appears.
    const failsafe = window.setTimeout(showAll, 3000);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  // Make sure body scroll is never left locked after a route change
  // (mobile menu handles its own state but this is a safety net).
  useEffect(() => {
    document.body.style.overflow = '';
  }, [pathname]);

  return null;
}
