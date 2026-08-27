import Image from 'next/image';

/**
 * Hero banner — the shop's real printed signage, presented rather than used
 * as wallpaper.
 *
 * Why it is framed instead of full-bleed:
 * the artwork is 3.77:1 and carries its OWN typography (gold PIONEER wordmark,
 * Sinhala headline, company name, phone number). Stretched behind the hero it
 * would (a) put that text directly under the white h1, breaking the 4.5:1
 * contrast floor, (b) push a bright white band through a dark-luxury ground,
 * and (c) crop ~85% away on a portrait phone. Mounting it on the dark ground
 * keeps every word legible at any width and reads as a displayed object —
 * which is the luxury move, not a stretched background.
 *
 * It is a MEANINGFUL image (it carries brand + contact information), so it
 * gets real alt text rather than aria-hidden.
 */
export default function HeroBanner() {
  return (
    <div className="reveal relative mb-10 md:mb-12">
      {/* Ember bed — the banner reads as lit from behind rather than pasted on. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-8 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(225,29,46,0.20),transparent_70%)]"
      />

      <figure className="relative">
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-white/[0.10] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.85)]">
          <Image
            src="/images/banner.jpg"
            alt="Pioneer tyres — three-wheeler tyres from Cey Hedges Lanka (Pvt) Ltd. Mobile 0777 330 561."
            width={1988}
            height={528}
            /* Above the fold and the whole point of the hero: never lazy-load
               it, and let it beat the rest of the page to the screen. */
            priority
            fetchPriority="high"
            quality={84}
            sizes="(max-width: 1023px) 92vw, 1100px"
            className="w-full h-auto"
          />

          {/* Inner rim — seats the printed sheet into the dark surface instead
              of letting it float as a bright rectangle. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.16), inset 0 0 60px rgba(0,0,0,0.30)',
            }}
          />
        </div>

        <figcaption className="sr-only">
          Pioneer three-wheeler tyres, distributed by Cey Hedges Lanka (Pvt) Ltd.
        </figcaption>
      </figure>
    </div>
  );
}
