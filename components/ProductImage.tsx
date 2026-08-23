'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  frameClassName?: string;
  tiltStrength?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  /** 'studio' = cream spotlight + multiply blend (for white-bg JPEGs).
   *  'dark'   = solid dark backdrop, no blend (for transparent-bg PNGs). */
  variant?: 'studio' | 'dark';
};

export function ProductImage({
  src,
  alt,
  size = 260,
  className = '',
  frameClassName = 'rounded-2xl',
  tiltStrength = 10,
  fill = false,
  priority = false,
  sizes,
  variant = 'studio',
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    if (!wrap || !tilt) return;

    let rect = wrap.getBoundingClientRect();
    const refreshRect = () => { rect = wrap.getBoundingClientRect(); };

    const onEnter = () => {
      refreshRect();
      tilt.style.transition = 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)';
      window.setTimeout(() => { tilt.style.transition = 'transform 140ms ease-out'; }, 400);
    };

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → +0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotY = x * tiltStrength * 2;
      const rotX = -y * tiltStrength * 2;
      const tx = x * 6;
      const ty = y * 6;
      tilt.style.transform =
        `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(1.03)`;
    };

    const onLeave = () => {
      tilt.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)';
      tilt.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale(1)';
    };

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', refreshRect, { passive: true });
    window.addEventListener('resize', refreshRect);

    return () => {
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', refreshRect);
      window.removeEventListener('resize', refreshRect);
    };
  }, [tiltStrength]);

  return (
    <div
      ref={wrapRef}
      className={[
        'overflow-hidden',
        frameClassName,
        className,
      ].join(' ')}
      style={{
        position: className.includes('absolute') ? undefined : 'relative',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Backdrop — 'studio' for white-bg JPEGs (multiply-blends the white away);
          'dark' for transparent-bg PNGs (solid dark, matches theme). */}
      {variant === 'studio' ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 45%, rgba(245, 240, 232, 1) 0%, rgba(210, 200, 190, 1) 26%, rgba(70, 55, 55, 1) 68%, rgba(10, 8, 8, 1) 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at 70% 20%, rgba(225,29,46,0.18) 0%, transparent 55%)',
            }}
          />
        </>
      ) : (
        <>
          {/* Solid dark base */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-ink-900"
          />
          {/* Soft red ember glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 55%, rgba(225,29,46,0.22) 0%, rgba(225,29,46,0.06) 40%, transparent 72%)',
            }}
          />
        </>
      )}

      {/* Tilting layer */}
      <div
        ref={tiltRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="relative w-[86%] h-[86%]"
          style={variant === 'studio' ? { mixBlendMode: 'multiply' } : undefined}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes || `${size}px`}
            priority={priority}
            className="object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)] select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Inner rim highlight for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -40px 60px rgba(0,0,0,0.5), inset 0 40px 60px rgba(0,0,0,0.35)',
        }}
      />
    </div>
  );
}
