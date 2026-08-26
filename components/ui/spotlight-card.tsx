'use client';

import React, { useEffect, useRef, ReactNode, CSSProperties } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Hue family for the spotlight. `ember` matches the Pioneer brand red. */
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'ember';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  /** When true, ignores `size` and uses width/height or className for sizing. */
  customSize?: boolean;
  /** Merged last — use it to override CSS vars (--backdrop, --border, --radius…). */
  style?: CSSProperties;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
  // Brand: stays crimson→orange across the whole sweep instead of drifting to cyan.
  ember: { base: 355, spread: 28 },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

const GLOW_STYLE_ID = 'glow-card-styles';

/**
 * IMPORTANT — coordinate space.
 *
 * An earlier version anchored the spotlight to the viewport via
 * `background-attachment: fixed` and a single set of global CSS vars. That
 * silently breaks whenever ANY ancestor creates a containing block —
 * `transform`, `filter`, `backdrop-filter`, `perspective` or `will-change` all
 * do. Our scroll-reveal wrapper sets `transform: translateY(0)` and
 * `will-change: transform`, so each card resolved the same global coordinates
 * from a different origin and only one card lit up correctly.
 *
 * We now track coordinates PER CARD, relative to that card's own box, with no
 * fixed attachment anywhere. This is immune to ancestor transforms/filters.
 */
const glowStyles = `
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 0 0;
    -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    -webkit-mask-clip: padding-box, border-box;
    mask-clip: padding-box, border-box;
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }

  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
    );
    filter: brightness(2);
  }

  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
    );
  }

  [data-glow] [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--radius) * 1px);
    border-width: calc(var(--border-size) * 20);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }

  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`;

/* ------------------------------------------------------------------ *
 * Shared pointer tracking — one listener for every card on the page.  *
 * ------------------------------------------------------------------ */

const registry = new Set<HTMLElement>();
let pointerX = 0;
let pointerY = 0;
let frame = 0;
let pending = false;
let teardown: (() => void) | null = null;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Reads every card's rect, then writes every card's vars — reads batched
 *  before writes so the browser does a single layout pass per frame. */
function paint() {
  if (!registry.size) return;

  const measured: Array<[HTMLElement, DOMRect]> = [];
  registry.forEach((el) => measured.push([el, el.getBoundingClientRect()]));

  for (const [el, r] of measured) {
    if (!r.width || !r.height) continue;
    const lx = pointerX - r.left;
    const ly = pointerY - r.top;
    el.style.setProperty('--x', lx.toFixed(2));
    el.style.setProperty('--y', ly.toFixed(2));
    el.style.setProperty('--xp', clamp01(lx / r.width).toFixed(3));
    el.style.setProperty('--yp', clamp01(ly / r.height).toFixed(3));
  }
}

/** Coalesces bursts of pointer/scroll events into one paint per frame.
 *  `pending` is cleared inside the callback *before* painting, so this stays
 *  correct no matter when the rAF id is assigned and can never wedge if
 *  `paint()` throws. */
function schedulePaint() {
  if (pending) return;
  pending = true;
  frame = requestAnimationFrame(() => {
    pending = false;
    paint();
  });
}

/** Centres the spotlight — the resting state before any pointer movement,
 *  and the permanent state for reduced-motion users. */
function seedCentre(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  el.style.setProperty('--x', (r.width / 2).toFixed(2));
  el.style.setProperty('--y', (r.height / 2).toFixed(2));
  el.style.setProperty('--xp', '0.5');
  el.style.setProperty('--yp', '0.5');
}

function ensureStylesheet() {
  if (document.getElementById(GLOW_STYLE_ID)) return;
  const tag = document.createElement('style');
  tag.id = GLOW_STYLE_ID;
  tag.textContent = glowStyles;
  document.head.appendChild(tag);
}

function register(el: HTMLElement) {
  ensureStylesheet();
  registry.add(el);
  seedCentre(el);

  if (teardown) return; // listeners already running

  // Motion-sensitive users keep the static centred glow — no tracking.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    teardown = () => {};
    return;
  }

  const onPointerMove = (e: PointerEvent) => {
    pointerX = e.clientX;
    pointerY = e.clientY;
    schedulePaint();
  };
  // Cards move under a stationary cursor while scrolling / resizing.
  const onReflow = () => schedulePaint();

  document.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('scroll', onReflow, { passive: true });
  window.addEventListener('resize', onReflow);

  teardown = () => {
    document.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', onReflow);
    window.removeEventListener('resize', onReflow);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    pending = false;
  };
}

function unregister(el: HTMLElement) {
  registry.delete(el);
  if (registry.size === 0 && teardown) {
    teardown();
    teardown = null;
  }
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false,
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    register(el);
    return () => unregister(el);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => (customSize ? '' : sizeMap[size]);

  const getInlineStyles = (): CSSProperties => {
    const baseStyles: CSSProperties & Record<string, string | number> = {
      '--base': base,
      '--spread': spread,
      '--radius': '14',
      '--border': '3',
      '--backdrop': 'hsl(0 0% 60% / 0.12)',
      '--backup-border': 'var(--backdrop)',
      '--size': '200',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 0',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      // NOTE: deliberately no `touch-action: none` — this is a decorative hover
      // effect, and suppressing touch would stop the page scrolling when a drag
      // starts on a card. Also deliberately no `background-attachment: fixed`,
      // see the comment above `glowStyles`.
    };

    if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return { ...baseStyles, ...style };
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={getInlineStyles()}
      className={[
        getSizeClasses(),
        !customSize ? 'aspect-[3/4]' : '',
        'rounded-2xl relative grid grid-rows-[1fr_auto]',
        'shadow-[0_1rem_2rem_-1rem_black] p-4 gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div ref={innerRef} data-glow />
      {children}
    </div>
  );
};

/**
 * Shared brand preset. Import this everywhere a GlowCard is used so the cards
 * stay identical across pages instead of drifting apart.
 *
 *   <GlowCard customSize glowColor="ember" style={emberCardVars} className="h-full p-8">
 */
const emberCardVars = {
  '--backdrop': 'rgba(16, 16, 20, 0.72)',
  '--radius': '16',
  '--border': '1',
  '--size': '280',
  '--bg-spot-opacity': '0.06',
  '--border-spot-opacity': '0.9',
  '--border-light-opacity': '0.35',
} as CSSProperties;

export { GlowCard, emberCardVars };
