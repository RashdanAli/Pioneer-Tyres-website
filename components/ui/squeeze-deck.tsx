'use client';

import {
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export type DeckSlide = {
  src: string;
  alt: string;
  title: string;
  description?: string;
};

type Props = {
  slides: DeckSlide[];
  /** Milliseconds each slide stays open under autoplay. */
  interval?: number;
  /** What a screen reader calls the deck. */
  label?: string;
  className?: string;
};

/* --------------------------------------------------------------------------
   Geometry

   The same squeeze as carousel-squeeze — one open 16:9 slide, three preview
   columns narrowing away from it, then slats — but as a LINEAR deck rather
   than a ring. All slides are rendered; each one's width is derived from its
   distance to the open slide, so nothing ever repeats past the last slide.

   A window of seven cards is on show. It slides with the open slide until it
   hits the end of the deck, then stays put and the open slide walks right
   through it — so the row is always full, even on slide 17.
   -------------------------------------------------------------------------- */

const WINDOW = 7;
/** Preview columns by distance from the open slide (1, 2, 3). */
const WEIGHTS = [0.61, 0.3, 0.15];

const GAP = 'clamp(6px, 1.4cqi, 16px)';
const SLAT_GAP = 'clamp(4px, 0.7cqi, 8px)';
const SLAT = 'clamp(4px, 0.7cqi, 8px)';

/* Row height, solved backwards: the open slide gets whatever width is left
   after gaps, slats and the previews' share (28% of the row, 72–340px).
   Capped so the toolbar, row, timer and caption fit under the fixed header
   on short laptop screens. */
const HEIGHT =
  `min(calc((100cqi - 3 * ${GAP} - 3 * ${SLAT_GAP} - 3 * ${SLAT} - clamp(72px, 28cqi, 340px)) * 9 / 16),` +
  ` max(160px, calc(100vh - 17rem)))`;

type Role = 'hidden' | 'open' | 'preview' | 'slat';

function layout(count: number, active: number) {
  const visible = Math.min(WINDOW, count);
  const start = Math.max(0, Math.min(active, count - visible));

  const roles: Role[] = [];
  const weights: number[] = [];
  for (let i = 0; i < count; i++) {
    const d = Math.abs(i - active);
    if (i < start || i >= start + visible) roles.push('hidden');
    else if (d === 0) roles.push('open');
    else if (d <= WEIGHTS.length) roles.push('preview');
    else roles.push('slat');
    weights.push(roles[i] === 'preview' ? WEIGHTS[d - 1] : 0);
  }

  // Gap before each visible card except the first: tight next to a slat.
  const gaps: (string | null)[] = roles.map(() => null);
  let nGap = 0;
  let nSlatGap = 0;
  let prev: Role | null = null;
  roles.forEach((r, i) => {
    if (r === 'hidden') return;
    if (prev) {
      const tight = r === 'slat' || prev === 'slat';
      gaps[i] = tight ? SLAT_GAP : GAP;
      if (tight) nSlatGap++;
      else nGap++;
    }
    prev = r;
  });

  const nSlat = roles.filter((r) => r === 'slat').length;
  const sumW = weights.reduce((a, b) => a + b, 0) || 1;
  const room = `(100cqi - var(--deck-hero) - ${nGap} * ${GAP} - ${nSlatGap} * ${SLAT_GAP} - ${nSlat} * ${SLAT})`;

  const widths = roles.map((r, i) => {
    if (r === 'hidden') return '0px';
    if (r === 'open') return 'var(--deck-hero)';
    if (r === 'slat') return SLAT;
    return `calc(${room} * ${(weights[i] / sumW).toFixed(4)})`;
  });

  return { roles, widths, gaps };
}

/* -------------------------------------------------------------------------- */

export function SqueezeDeck({ slides, interval = 4000, label = 'Slides', className }: Props) {
  const count = slides.length;
  const last = count - 1;

  const rootRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipe = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  // Was the last input a key press? `:focus-visible` can't be trusted for
  // focus we move ourselves (e.g. back to the slide after closing the reader),
  // so track the modality directly.
  const keyboardMode = useRef(false);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey && !e.altKey) keyboardMode.current = true;
    };
    const onPointer = () => { keyboardMode.current = false; };
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('pointerdown', onPointer, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('pointerdown', onPointer, true);
    };
  }, []);

  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [kbFocus, setKbFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const [armed, setArmed] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  /* Autoplay holds only for things a reader is visibly doing: a mouse over
     the slides, keyboard focus inside, the expanded view, the pause button,
     or the section being off-screen. Touch taps and mouse clicks on the
     arrows never leave it stuck. */
  const running =
    playing && !reduced && !hovered && !kbFocus && !expanded && inView && pageVisible;

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const onVis = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);

    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      setArmed(true);
      return () => document.removeEventListener('visibilitychange', onVis);
    }
    const view = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    // Start fetching slide images a little before the section arrives.
    const near = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setArmed(true); near.disconnect(); } },
      { rootMargin: '600px 0px' },
    );
    view.observe(el);
    near.observe(el);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      view.disconnect();
      near.disconnect();
    };
  }, []);

  const goTo = useCallback((i: number) => setActive(Math.max(0, Math.min(last, i))), [last]);
  // At the end, "next" starts the deck again from slide 1.
  const next = useCallback(() => setActive((a) => (a >= last ? 0 : a + 1)), [last]);
  const prev = useCallback(() => setActive((a) => Math.max(0, a - 1)), []);

  const expand = (i: number) => {
    goTo(i);
    setExpanded(true);
  };

  const collapse = () => {
    setExpanded(false);
    // Hand focus back to the slide that was being read.
    requestAnimationFrame(() => cardRefs.current[active]?.focus({ preventScroll: true }));
  };

  /* Trackpad / horizontal wheel: one step per deliberate flick. */
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let acc = 0;
    let lastStep = 0;
    let idle: number | undefined;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); // also stops the browser's swipe-to-go-back
      acc += e.deltaX;
      window.clearTimeout(idle);
      idle = window.setTimeout(() => (acc = 0), 200);
      const now = performance.now();
      if (Math.abs(acc) > 50 && now - lastStep > 700) {
        if (acc > 0) setActive((a) => Math.min(last, a + 1));
        else setActive((a) => Math.max(0, a - 1));
        acc = 0;
        lastStep = now;
      }
    };
    row.addEventListener('wheel', onWheel, { passive: false });
    return () => row.removeEventListener('wheel', onWheel);
  }, [last]);

  /* Touch / pen / mouse swipe on the row. A swipe is never also a click. */
  const onPointerDown = (e: PointerEvent) => {
    // A swipe never gets its click, so the flag must reset per gesture or it
    // would swallow the next genuine tap.
    suppressClick.current = false;
    swipe.current = { x: e.clientX, y: e.clientY, moved: false };
  };
  const onPointerUp = (e: PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick.current = true;
      if (dx < 0) setActive((a) => Math.min(last, a + 1));
      else setActive((a) => Math.max(0, a - 1));
    }
  };

  const onRowKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); setActive((a) => Math.min(last, a + 1)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  // Keep the roving tab stop on the open slide.
  useEffect(() => {
    if (kbFocus && rowRef.current?.contains(document.activeElement)) {
      cardRefs.current[active]?.focus({ preventScroll: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!count) return null;

  const { roles, widths, gaps } = layout(count, active);
  const pad = (n: number) => String(n).padStart(2, '0');
  const pausedByReader = playing && !reduced && !running && inView && !expanded;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn('w-full', className)}
      style={{
        containerType: 'inline-size',
        ['--deck-h' as string]: HEIGHT,
        ['--deck-hero' as string]: 'calc(var(--deck-h) * 16 / 9)',
      }}
      onFocus={() => setKbFocus(keyboardMode.current)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKbFocus(false);
      }}
    >
      {/* Toolbar */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              className={ctrl}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
          )}
          <p className="font-display text-sm tabular-nums tracking-wider" aria-live={running ? 'off' : 'polite'} aria-atomic="true">
            <span className="sr-only">Slide </span>
            <span className="text-white">{pad(active + 1)}</span>
            <span className="text-bone-400"> / {pad(count)}</span>
            {(pausedByReader || !playing) && !reduced && (
              <span className="ml-2 text-xs uppercase tracking-[0.18em] text-bone-400">Paused</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={prev} disabled={active === 0} aria-label="Previous slide" className={ctrl}>
            <ArrowIcon back />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={active === last ? 'Start again from slide 1' : 'Next slide'}
            className={ctrl}
          >
            {active === last ? <RestartIcon /> : <ArrowIcon />}
          </button>
        </div>
      </div>

      {/* The row */}
      <div
        ref={rowRef}
        role="group"
        aria-label="Slides — arrow keys move, Enter expands"
        className="flex w-full overflow-hidden"
        style={{ height: 'var(--deck-h)', touchAction: 'pan-y' }}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(false); swipe.current = null; }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipe.current = null)}
        onKeyDown={onRowKey}
      >
        {slides.map((s, i) => {
          const role = roles[i];
          const hidden = role === 'hidden';
          const open = role === 'open';
          return (
            <button
              key={s.src}
              ref={(el) => { cardRefs.current[i] = el; }}
              type="button"
              tabIndex={open ? 0 : -1}
              aria-hidden={hidden || undefined}
              aria-label={`Expand slide ${i + 1} of ${count}: ${s.title}`}
              onClick={() => {
                if (suppressClick.current) { suppressClick.current = false; return; }
                expand(i);
              }}
              className={cn(
                'group relative h-full shrink-0 cursor-zoom-in overflow-hidden rounded-2xl bg-ink-800 p-0',
                'focus-visible:outline-offset-[3px]',
                hidden && 'pointer-events-none',
              )}
              style={{
                width: widths[i],
                marginLeft: gaps[i] ?? 0,
                transition: 'width 900ms var(--ease-out-expo), margin-left 900ms var(--ease-out-expo)',
              }}
            >
              {armed && (
                /* Drawn at the full 16:9 size and centred, so a narrowing
                   card only changes how much of the slide shows — the picture
                   itself never rescales mid-animation. */
                <img
                  src={s.src}
                  alt=""
                  draggable={false}
                  decoding="async"
                  className="absolute inset-y-0 left-1/2 h-full max-w-none -translate-x-1/2 select-none"
                  style={{ width: 'var(--deck-hero)', minWidth: '100%' }}
                />
              )}
              {/* Previews sit a step back from the open slide. */}
              <span
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute inset-0 bg-ink-950 transition-opacity duration-500',
                  open ? 'opacity-0' : 'opacity-25 group-hover:opacity-10',
                )}
              />
              {open && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white opacity-90 transition-opacity group-hover:opacity-100 sm:bottom-4 sm:left-4"
                >
                  <ExpandIcon />
                  <span className="hidden min-[400px]:inline">Tap to expand</span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Timer line — one segment per slide. The open slide's segment fills
          over `interval`, and the deck advances when that fill ends, so the
          line and the timer cannot drift apart (paused = paused fill). */}
      <div className="mt-4 flex gap-1" aria-hidden="true">
        {slides.map((s, i) => (
          <div key={s.src} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.12]">
            {i < active && <div className="absolute inset-0 bg-white/35" />}
            {i === active &&
              (reduced ? (
                <div className="absolute inset-0 bg-ember-500" />
              ) : (
                <div
                  key={active}
                  className="absolute inset-0 origin-left bg-ember-500"
                  style={{
                    animation: `deck-timer ${interval}ms linear forwards`,
                    animationPlayState: running ? 'running' : 'paused',
                  }}
                  onAnimationEnd={next}
                />
              ))}
          </div>
        ))}
      </div>

      {/* Captions stacked in one grid cell so the tallest sets the height —
          switching slides never shifts the page below. */}
      <div className="mt-5 grid">
        {slides.map((s, i) => (
          <p
            key={s.src}
            aria-hidden={i !== active}
            className="col-start-1 row-start-1 max-w-3xl text-[15px] leading-relaxed text-pretty transition-opacity duration-500 md:text-[17px]"
            style={{ opacity: i === active ? 1 : 0, visibility: i === active ? 'visible' : 'hidden' }}
          >
            <span className="text-white">{s.title}</span>{' '}
            {s.description && <span className="text-bone-300">{s.description}</span>}
          </p>
        ))}
      </div>

      {expanded &&
        createPortal(
          <Reader slides={slides} index={active} onIndex={goTo} onClose={collapse} />,
          document.body,
        )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Reader — the expanded view. Portalled to <body>: the section sits inside a
   transformed reveal wrapper, and `position: fixed` inside a transform is
   fixed to that wrapper, not the screen.
   -------------------------------------------------------------------------- */

function Reader({
  slides,
  index,
  onIndex,
  onClose,
}: {
  slides: DeckSlide[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const count = slides.length;
  const s = slides[index];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    backRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    if (e.key === 'ArrowRight' && index < count - 1) { e.preventDefault(); onIndex(index + 1); }
    if (e.key === 'ArrowLeft' && index > 0) { e.preventDefault(); onIndex(index - 1); }
    if (e.key === 'Tab') {
      // Keep focus inside the dialog.
      const f = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])');
      if (!f || !f.length) return;
      const first = f[0];
      const lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Slide ${index + 1} of ${count}: ${s.title}`}
      onKeyDown={onKeyDown}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      /* Solid on phones: without the blur, a translucent scrim lets the page's
         big headings ghost through behind the caption. */
      className="fixed inset-0 z-[100] flex flex-col bg-ink-950 px-4 pb-5 pt-4 animate-fade-in sm:px-8 sm:pb-8 sm:pt-6 md:bg-ink-950/90 md:backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-4">
        <button
          ref={backRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] pl-3 pr-4 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.1]"
        >
          <ArrowIcon back />
          Back
        </button>
        <p className="font-display text-sm tabular-nums tracking-wider">
          <span className="text-white">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-bone-400"> / {String(count).padStart(2, '0')}</span>
        </p>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center py-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className="aspect-[16/9] w-full rounded-xl bg-bone-100 object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] animate-fade-in"
          style={{ maxWidth: 'min(100%, calc((100vh - 11rem) * 16 / 9))' }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-5xl items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[15px] leading-relaxed text-pretty md:text-base">
            <span className="text-white">{s.title}</span>{' '}
            {s.description && <span className="text-bone-300">{s.description}</span>}
          </p>
          <p className="mt-1 hidden text-xs text-bone-400 [@media(pointer:coarse)]:block">
            Pinch to zoom, or turn your phone sideways for a bigger view.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => onIndex(index - 1)} disabled={index === 0} aria-label="Previous slide" className={ctrl}>
            <ArrowIcon back />
          </button>
          <button type="button" onClick={() => onIndex(index + 1)} disabled={index === count - 1} aria-label="Next slide" className={ctrl}>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const ctrl = cn(
  'inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-bone-100',
  'transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:bg-white/[0.12]',
  'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/15 disabled:hover:bg-white/[0.04]',
);

function ArrowIcon({ back = false }: { back?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d={back ? 'M16 10H4m0 0 4-4m-4 4 4 4' : 'M4 10h12m0 0-4-4m4 4-4 4'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.5 3.5v9M10.5 3.5v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 3.5v9l7-4.5-7-4.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function RestartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10a6 6 0 1 0 1.8-4.3M4 3.5v3.2h3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SqueezeDeck;
