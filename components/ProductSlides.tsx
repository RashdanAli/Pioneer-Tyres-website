'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const SLIDE_COUNT = 17;
const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => ({
  src: `/images/slides/slide-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Ceyhedges product awareness presentation — slide ${i + 1} of ${SLIDE_COUNT}`,
}));

/* How long each slide holds before advancing. Hover, focus or touch pauses
   it, so anyone who wants to read a dense slide in full can stop it. */
const DWELL_MS = 3900;

export default function ProductSlides() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<number>();
  const draggingRef = useRef(false);

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  // Autoplay only runs while nobody is looking closely: any hover, keyboard
  // focus, touch, off-screen section or background tab holds the slide.
  const running = playing && !reduced && !hovered && !focused && !dragging && inView && pageVisible;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      setPlaying(false);
    }

    const onVisibility = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);

    const el = wrapRef.current;
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
      io.observe(el);
    } else {
      setInView(true);
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      io?.disconnect();
      window.clearTimeout(settleTimer.current);
    };
  }, []);

  /* Distance between two slide starts (slide width + gap). Measured rather
     than computed so it always agrees with whatever the CSS resolved to. */
  const getStep = () => {
    const el = scrollerRef.current;
    if (!el) return 1;
    const a = el.children[0] as HTMLElement | undefined;
    const b = el.children[1] as HTMLElement | undefined;
    return (a && b ? b.offsetLeft - a.offsetLeft : el.clientWidth) || 1;
  };

  const scrollToPos = useCallback(
    (pos: number, smooth: boolean) => {
      scrollerRef.current?.scrollTo({ left: pos * getStep(), behavior: smooth && !reduced ? 'smooth' : 'auto' });
    },
    [reduced],
  );

  const currentPos = () => {
    const el = scrollerRef.current;
    return el ? Math.round(el.scrollLeft / getStep()) : 0;
  };

  /* The track ends with a copy of slide 1. Advancing past the last slide
     glides onto that copy, then — once scrolling settles — jumps invisibly
     back to the real slide 1. That keeps the loop moving right-to-left
     instead of rewinding through all fifteen slides. */
  const next = useCallback(() => {
    let pos = currentPos();
    if (pos >= SLIDE_COUNT) {
      scrollToPos(0, false);
      pos = 0;
    }
    scrollToPos(pos + 1, true);
  }, [scrollToPos]);

  const prev = useCallback(() => {
    let pos = currentPos();
    if (pos <= 0) {
      scrollToPos(SLIDE_COUNT, false);
      pos = SLIDE_COUNT;
    }
    scrollToPos(pos - 1, true);
  }, [scrollToPos]);

  const settle = () => {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      if (draggingRef.current) return;
      const pos = currentPos();
      if (pos >= SLIDE_COUNT) scrollToPos(pos - SLIDE_COUNT, false);
    }, 140);
  };

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / getStep()) % SLIDE_COUNT);
    settle();
  };

  const setDrag = (v: boolean) => {
    draggingRef.current = v;
    setDragging(v);
    if (!v) settle();
  };

  return (
    <section id="presentation" className="relative py-24 md:py-32 plate-base">
      <div className="ambient ambient-center" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px hairline" aria-hidden="true" />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <div className="reveal eyebrow">Product Awareness</div>
          <h2 className="display-caps text-display-lg mt-4 text-balance">
            <span className="block reveal-mask reveal-delay-1">The full story,</span>
            <span className="block reveal-mask reveal-delay-2 text-ember-500">slide by slide.</span>
          </h2>
          <p className="reveal reveal-delay-3 mt-5 text-lg text-bone-300 text-pretty">
            Our tyres and tubes, from compound to fitment. It plays on its own — swipe, scroll or use
            the arrows to move at your own pace.
          </p>
        </div>

        {/* Width is capped by viewport height so a whole 16:9 slide plus its
            controls always fits on screen, even on short laptop displays. */}
        <div
          ref={wrapRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Product awareness presentation"
          className="reveal-card reveal-delay-4 mt-12 mx-auto"
          style={{ maxWidth: 'min(100%, max(20rem, calc((100svh - 13rem) * 16 / 9)))' }}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
          // Only keyboard focus pauses; a mouse click on an arrow shouldn't
          // leave the slideshow stuck until the user clicks somewhere else.
          onFocus={(e) => setFocused(e.target.matches(':focus-visible'))}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <div
            ref={scrollerRef}
            tabIndex={0}
            aria-label="Slides — use the left and right arrow keys to move"
            className="no-scrollbar flex gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory rounded-2xl"
            onScroll={onScroll}
            onTouchStart={() => setDrag(true)}
            onTouchEnd={() => setDrag(false)}
            onTouchCancel={() => setDrag(false)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
              if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
            }}
          >
            {[...slides, slides[0]].map((s, i) => {
              const clone = i === SLIDE_COUNT;
              return (
                <div
                  key={i}
                  role={clone ? undefined : 'group'}
                  aria-roledescription={clone ? undefined : 'slide'}
                  aria-label={clone ? undefined : `${i + 1} of ${SLIDE_COUNT}`}
                  aria-hidden={clone || undefined}
                  className="relative w-full shrink-0 snap-start snap-always aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.08] bg-bone-100"
                >
                  <Image
                    src={s.src}
                    alt={clone ? '' : s.alt}
                    fill
                    sizes="(max-width: 1280px) 92vw, 1184px"
                    className="object-cover select-none"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          {/* Progress — one segment per slide; the current one fills over the
              dwell time and advancing is driven by that fill finishing, so the
              bar and the timer can never drift apart (pause = paused fill). */}
          <div className="mt-5 flex gap-1" aria-hidden="true">
            {slides.map((_, i) => (
              <div key={i} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.12]">
                {i < active && <div className="absolute inset-0 bg-white/35" />}
                {i === active &&
                  (reduced ? (
                    <div className="absolute inset-0 bg-ember-500" />
                  ) : (
                    <div
                      key={active}
                      className="absolute inset-0 origin-left bg-ember-500"
                      style={{
                        animation: `slide-progress ${DWELL_MS}ms linear forwards`,
                        animationPlayState: running ? 'running' : 'paused',
                      }}
                      onAnimationEnd={next}
                    />
                  ))}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="font-display text-sm tabular-nums tracking-wider" aria-live={running ? 'off' : 'polite'} aria-atomic="true">
              <span className="sr-only">Slide </span>
              <span className="text-white">{String(active + 1).padStart(2, '0')}</span>
              <span className="text-bone-400"> / {String(SLIDE_COUNT).padStart(2, '0')}</span>
            </p>

            <div className="flex items-center gap-2">
              {!reduced && (
                <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} className={ctrl}>
                  {playing ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M5.5 3.5v9M10.5 3.5v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M5 3.5v9l7-4.5-7-4.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              )}
              <button type="button" onClick={prev} aria-label="Previous slide" className={ctrl}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M16 10H4m0 0 4-4m-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" onClick={next} aria-label="Next slide" className={ctrl}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ctrl =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-bone-100 cursor-pointer transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:bg-white/[0.12]';
