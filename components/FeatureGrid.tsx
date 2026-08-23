const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 2L4 7v6c0 6 4 11 10 13 6-2 10-7 10-13V7l-10-5z" stroke="#F5525E" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 14l3.5 3.5L20 10" stroke="#F5525E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Extreme Durability',
    body: 'Engineered to survive potholes, monsoon heat, and daily overload. Tested where it matters — on our roads.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3v22M6 8l16 12M6 20l16-12" stroke="#F5525E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Precision Grip',
    body: 'Silica-blend compounds tuned for wet monsoon roads and hot dry tarmac. Confidence at every lean angle.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="#F5525E" strokeWidth="1.5" />
        <path d="M14 8v6l4 3" stroke="#F5525E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Long-Life Compound',
    body: 'Pioneer tuk-tuk tyres regularly cross 40,000 km on typical daily routes across the island.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 20l4-4 3 3 5-6 4 4 4-5" stroke="#F5525E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="8" r="2" stroke="#F5525E" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Fuel-Efficient',
    body: 'Low-rolling-resistance profiles cut drag. More kilometres per litre — every ride, every day.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4l3 6 6 1-4.5 4.5 1 6.5L14 19l-5.5 3 1-6.5L5 11l6-1 3-6z" stroke="#F5525E" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Manufacturer Warranty',
    body: 'Every Pioneer tyre and Avis tube is covered against manufacturing defects. Simple, honest, no fine print.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 22h20M6 22v-6l8-10 8 10v6" stroke="#F5525E" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11 22v-6h6v6" stroke="#F5525E" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Made in Sri Lanka',
    body: 'Locally engineered, locally produced. Real jobs, real quality control — and no shipping delays.',
  },
];

export default function FeatureGrid() {
  return (
    <section id="why" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="reveal grid gap-8 md:grid-cols-12 items-end mb-16">
          <div className="md:col-span-7">
            <div className="eyebrow">Why Choose Us</div>
            <h2 className="display text-display-lg mt-4 text-balance">
              Not the loudest brand.<br />
              <span className="italic text-ember-500">Just the longest-lasting.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-lg text-bone-300 text-pretty">
            25+ years of building for the specific chaos of Sri Lankan roads —
            heat, monsoon, potholes, and overload. Here&apos;s what that gets you.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`reveal reveal-delay-${(i % 4) + 1} surface p-8 hover:border-ember-500/25 hover:bg-ink-700/40 transition-all duration-500 group`}
            >
              <div className="w-12 h-12 rounded-xl bg-ember-500/10 border border-ember-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-ember-500/15 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="font-display text-2xl text-white leading-tight">{f.title}</h3>
              <p className="mt-3 text-bone-300 text-[15px] leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
