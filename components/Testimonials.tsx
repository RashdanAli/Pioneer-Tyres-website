const quotes = [
  {
    quote: 'Been running Pioneer Cooper on my tuk-tuk for three years. 42,000 km on one set. No brand comes close for the price.',
    name: 'Sunil Perera',
    role: 'Tuk-Tuk driver · Kandy',
  },
  {
    quote: 'The Storm compound saved me on the Katunayake road last monsoon. First set I trust in wet conditions.',
    name: 'Nuwan Silva',
    role: 'Daily commuter · Colombo',
  },
  {
    quote: 'We fit Titan on our whole fleet now. Cylinders, produce, market runs — the sidewalls don’t give up.',
    name: 'Rohan Fernando',
    role: 'Fleet operator · Negombo',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="reveal max-w-2xl mb-14">
          <div className="eyebrow">The verdict</div>
          <h2 className="display text-display-lg mt-4 text-balance">
            From the people <span className="italic text-ember-500">who ride them.</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <figure
              key={q.name}
              className={`reveal reveal-delay-${i + 1} relative surface-elevated p-8 flex flex-col`}
            >
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="text-ember-500/30 mb-6" aria-hidden="true">
                <path d="M0 24V14C0 8 4 2 12 0v6c-3 1-5 4-5 8h5v10H0zM18 24V14C18 8 22 2 30 0v6c-3 1-5 4-5 8h5v10H18z" fill="currentColor" />
              </svg>
              <blockquote className="text-lg text-bone-100 leading-relaxed flex-1">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-white/[0.06]">
                <div className="font-display text-lg text-white">{q.name}</div>
                <div className="text-xs text-bone-400 uppercase tracking-wider mt-0.5">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
