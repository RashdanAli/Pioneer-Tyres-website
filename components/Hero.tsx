import Link from 'next/link';
import { ProductImage } from './ProductImage';
import HeroVideo from './HeroVideo';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28 pb-16">
      {/* Background — video + radial glows + grid.
          The video sits inside this section, so it scrolls away with the hero. */}
      <HeroVideo />
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
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-7 relative z-10">
            <div className="reveal flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-bone-100">
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500 animate-ember-pulse" />
                Available Since 2000
              </span>
            </div>

            <h1 className="reveal reveal-delay-1 mt-8 display text-display-xl text-balance">
              Built for the <span className="italic text-ember-500">road.</span><br />
              Trusted by <span className="italic">every rider.</span>
            </h1>

            <p className="reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-bone-300 text-pretty">
              High-durability tuk-tuk tyres and universal inner tubes —
              engineered for Sri Lanka&apos;s heat, rain, and every kilometre in between.
            </p>

            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-3">
              <Link href="#selector" className="btn-primary">
                Find your tyre
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            {/* Trust bar */}
            <div className="reveal reveal-delay-4 mt-14 grid grid-cols-3 gap-6 sm:gap-10 max-w-xl border-t border-white/[0.08] pt-8">
              <Stat value="25" suffix="+ yrs" label="Available since 2000" />
              <Stat value="40K" suffix="+ km" label="Avg. tuk-tuk life" />
              <Stat value="2 yr" label="Manufacturer warranty" />
            </div>
          </div>

          {/* Right — hero product */}
          <div className="lg:col-span-5 relative">
            <div className="reveal reveal-delay-2 relative aspect-square max-w-[520px] mx-auto">
              {/* Ambient halo behind */}
              <div className="absolute inset-0 rounded-full bg-ember-glow blur-3xl opacity-70" />

              <ProductImage
                src="/images/pioneer-tyre.png"
                alt="Pioneer Tuk Tuk Tyre"
                size={480}
                frameClassName="rounded-[32px]"
                className="absolute inset-0 shadow-[0_40px_100px_-20px_rgba(225,29,46,0.35)]"
                variant="dark"
                tiltStrength={12}
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
              />

              {/* Floating spec chips */}
              <SpecChip className="absolute top-6 -left-2 md:-left-8 z-20" label="Load Index" value="78J" />
              <SpecChip className="absolute bottom-8 -right-2 md:-right-6 z-20" label="Tread depth" value="10.2 mm" />
              <SpecChip className="absolute top-1/2 -right-4 md:-right-14 -translate-y-1/2 z-20" label="Ply rating" value="6 PR" />
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

function Stat({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-4xl text-white leading-none">
        {value}<span className="text-ember-500">{suffix}</span>
      </div>
      <div className="mt-2 text-xs text-bone-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function SpecChip({ className, label, value }: { className?: string; label: string; value: string }) {
  return (
    <div className={`hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-ink-900/80 backdrop-blur-md px-4 py-2.5 shadow-2xl ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />
      <div>
        <div className="text-[10px] uppercase tracking-widest text-bone-400">{label}</div>
        <div className="text-sm text-white font-medium leading-tight">{value}</div>
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
