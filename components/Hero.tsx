import Link from 'next/link';
import HeroBanner from './HeroBanner';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-20 md:pt-28 pb-16">
      {/* Background — radial glows + grid. No video: the hero's ground is
          drawn in CSS, which costs nothing to download or decode. */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(225,29,46,0.14),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(225,29,46,0.09),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
             style={{
               backgroundImage:
                 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
               backgroundSize: '64px 64px',
             }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12">
          {/* Signage first: this is the brand asset we want seen the moment
              the page opens, and at 3.77:1 it needs the full content width to
              stay legible. Placed ahead of the copy in DOM order too, so the
              reading order matches the visual order for screen readers. */}
          <div className="lg:col-span-12">
            <HeroBanner />
          </div>

          {/* Copy */}
          <div className="lg:col-span-8 relative z-10">
            <div className="reveal flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-bone-100">
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500 animate-ember-pulse" />
                Available Since 2000
              </span>
            </div>

            <h1 className="mt-8 display-caps text-display-xl text-balance">
              <span className="block reveal-mask reveal-delay-1">
                Built for the <span className="text-ember-500">road.</span>
              </span>
              <span className="block reveal-mask reveal-delay-2">
                Trusted by every rider.
              </span>
            </h1>

            <p className="reveal reveal-delay-3 mt-8 max-w-xl text-lg leading-relaxed text-bone-300 text-pretty">
              High-durability tuk-tuk tyres and universal inner tubes —
              engineered for Sri Lanka&apos;s heat, rain, and every kilometre in between.
            </p>

            <div className="reveal reveal-delay-4 mt-10 flex flex-wrap items-center gap-3">
              <Link href="#selector" className="btn-primary">
                Find your tyre
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            {/* Trust bar — the rule draws itself, then the figures resolve
                out of blur one after another. */}
            <div className="mt-14 max-w-xl">
              <div className="reveal-rule reveal-delay-4 h-px bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
              <div className="grid grid-cols-3 gap-6 sm:gap-10 pt-8">
                <Stat value="25" suffix="+ yrs" label="Available since 2000" delay={4} />
                <Stat value="40K" suffix="+ km" label="Avg. tuk-tuk life" delay={5} />
                <Stat value="2 yr" label="Manufacturer warranty" delay={6} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Rolling ticker at bottom */}
      <div className="marquee relative mt-16 border-y border-white/[0.05] bg-ink-900/60 py-4 overflow-hidden">
        <div className="marquee-track text-bone-200/70 text-sm uppercase tracking-[0.25em] font-medium">
          {[...Array(2)].flatMap((_, i) => [
            <TickerItem key={`a${i}`}>Tuk-Tuk tyres</TickerItem>,
            <TickerItem key={`b${i}`}>Universal inner tubes</TickerItem>,
            <TickerItem key={`c${i}`}>City · Highway · Off-road</TickerItem>,
            <TickerItem key={`d${i}`}>Monsoon-ready compounds</TickerItem>,
            <TickerItem key={`e${i}`}>Trusted since 2000</TickerItem>,
            <TickerItem key={`f${i}`}>Island-wide availability</TickerItem>,
          ])}
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  delay = 1,
}: {
  value: string;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  return (
    <div>
      <div className={`reveal-blur reveal-delay-${delay} display text-3xl md:text-4xl text-white leading-none tabular-nums`}>
        {value}<span className="text-ember-500">{suffix}</span>
      </div>
      <div className={`reveal reveal-delay-${delay} mt-2 text-xs text-bone-400 uppercase tracking-[0.18em]`}>
        {label}
      </div>
    </div>
  );
}

function TickerItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-8 whitespace-nowrap">
      <span>{children}</span>
      <span className="text-ember-500">●</span>
    </div>
  );
}
