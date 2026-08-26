'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero background video.
 * - Lives INSIDE the hero <section> as an absolutely-positioned layer, so it
 *   scrolls away with the hero (it does NOT stay fixed to the viewport).
 * - Muted autoplay + loop + playsInline so it starts on load without a click;
 *   a one-time interaction listener retries play() if the browser blocked it.
 * - Pauses automatically when the hero scrolls off-screen or the tab is hidden.
 * - Honors prefers-reduced-motion: never autoplays; shows the still first frame
 *   behind the same scrim, so nothing moves for motion-sensitive users.
 * - Heavy dark + red scrim keeps it blended into the theme and keeps the hero
 *   text well above the 4.5:1 contrast floor.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return; // show the paused first frame; no autoplay

    const tryPlay = () => {
      video.play().catch(() => {
        /* autoplay blocked — the interaction listener below will retry */
      });
    };

    // Retry play on the first user interaction if autoplay was blocked.
    const onInteract = () => {
      tryPlay();
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
    };
    window.addEventListener('pointerdown', onInteract, { once: true });
    window.addEventListener('keydown', onInteract, { once: true });

    // Pause when the hero scrolls off-screen or the tab is hidden; resume when
    // it comes back. A rAF-throttled scroll check is deterministic across
    // browsers; IntersectionObserver is added too as a cheap fast-path.
    let ticking = false;
    const syncPlayback = () => {
      ticking = false;
      if (document.hidden) {
        video.pause();
        return;
      }
      const rect = video.getBoundingClientRect();
      const onScreen = rect.bottom > 0 && rect.top < window.innerHeight;
      if (onScreen) tryPlay();
      else video.pause();
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(syncPlayback);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.02 },
    );
    io.observe(video);

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', syncPlayback);

    tryPlay();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', syncPlayback);
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* The video itself — desaturated slightly and dimmed so it reads as a
          moody backdrop, not a foreground element. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'saturate(1.06) contrast(1.06) brightness(0.82)' }}
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-tuktuk.mp4" type="video/mp4" />
      </video>

      {/* Blend layers — tuned so text stays readable and the video melts into
          the dark theme at every edge. */}
      {/* 1. Overall dark scrim — lighter than before so the footage reads. */}
      <div className="absolute inset-0 bg-ink-950/45" />
      {/* 2. Left-weighted gradient so the copy column keeps its dark bed.
             Written as an inline gradient on purpose: Tailwind only emits
             colour/opacity utilities for values on its opacity scale, so an
             off-scale stop (e.g. /88) silently drops `--tw-gradient-from` and
             collapses the whole layer to `background-image: none`. This layer
             guards hero text contrast, so it must not depend on that. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(5,5,6,0.90) 0%, rgba(5,5,6,0.45) 50%, rgba(5,5,6,0.10) 100%)',
        }}
      />
      {/* 3. Brand red wash for warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(225,29,46,0.16),transparent_60%)] mix-blend-screen" />
      {/* 4. Top + bottom fades so it seams into the nav and the next section */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
