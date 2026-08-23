'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products, filterOptions, type Category } from '@/lib/products';
import { TyreArt } from './TyreArt';

export default function TyreSelector() {
  const [category, setCategory] = useState<Category | null>(null);

  const match = category ? products.find((p) => p.category === category) : null;
  const reset = () => setCategory(null);
  const progress = category ? 100 : 0;

  return (
    <section id="selector" className="relative py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.06),transparent_60%)]" />
      </div>

      <div className="container-x relative">
        <div className="reveal max-w-2xl">
          <div className="eyebrow">Interactive Product Selector</div>
          <h2 className="display text-display-lg mt-4 text-balance">
            One question.<br />
            <span className="italic text-ember-500">Your perfect fit.</span>
          </h2>
          <p className="mt-5 text-lg text-bone-300 text-pretty">
            Tell us what you need. We&apos;ll match you with the product engineered for it.
          </p>
        </div>

        <div className="reveal reveal-delay-1 mt-12 surface-elevated overflow-hidden">
          {/* Progress bar */}
          <div className="relative h-1 bg-white/[0.04]">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-ember-600 to-ember-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-xs text-bone-400 uppercase tracking-[0.2em]">
                {!category ? (
                  <>Only <span className="text-ember-400">2 products</span> — pick your fit</>
                ) : (
                  <span className="text-ember-400">Your match</span>
                )}
              </div>
              {category && (
                <button
                  onClick={reset}
                  className="text-xs text-bone-300 hover:text-white uppercase tracking-wider transition-colors"
                >
                  ↺ Reset
                </button>
              )}
            </div>

            {/* Step: pick category */}
            {!category && (
              <div className="animate-fade-up">
                <div className="mb-8 max-w-lg">
                  <h3 className="font-display text-2xl md:text-3xl text-white leading-tight">
                    What do you need?
                  </h3>
                  <p className="mt-2 text-bone-300 text-sm md:text-base">
                    We make two things — <span className="text-white">Pioneer</span> tuk-tuk tyres and <span className="text-white">Avis</span> inner tubes.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {filterOptions.category.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      hint={opt.hint}
                      icon={opt.value === 'tyre' ? <TyreIcon /> : <TubeIcon />}
                      active={false}
                      onClick={() => setCategory(opt.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Result */}
            {match && (
              <div className="animate-fade-up">
                <div className="grid gap-8 md:grid-cols-2 items-center">
                  <div className="relative aspect-square rounded-2xl bg-ink-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.16),transparent_60%)]" />
                    <TyreArt size={260} pattern={match.tread ?? 'rib'} />
                  </div>
                  <div>
                    <div className="text-[11px] text-ember-400 uppercase tracking-wider mb-1">{match.series}</div>
                    <h3 className="font-display text-3xl md:text-4xl text-white leading-tight">{match.name}</h3>
                    <p className="mt-3 text-bone-100 italic font-display text-lg">{match.tagline}</p>
                    <p className="mt-4 text-bone-300 text-[15px] leading-relaxed">{match.description}</p>

                    <div className="mt-6">
                      <div className="text-xs uppercase tracking-[0.2em] text-bone-400 mb-2">Available sizes</div>
                      <div className="flex flex-wrap gap-2">
                        {match.sizes.map((s) => (
                          <span key={s} className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-bone-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link href={`/tyres/${match.slug}`} className="btn-primary">
                        See details
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Link>
                      <button onClick={reset} className="btn-ghost">Start over</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function OptionCard({
  label,
  hint,
  icon,
  active,
  onClick,
}: {
  label: string;
  hint: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group relative flex flex-col items-center gap-4 rounded-2xl border p-8 text-center transition-all duration-300 cursor-pointer min-h-[200px]',
        active
          ? 'border-ember-500 bg-ember-500/[0.08] shadow-[0_0_0_1px_rgba(225,29,46,0.4),0_20px_60px_-20px_rgba(225,29,46,0.5)]'
          : 'border-white/[0.08] bg-ink-900/60 hover:border-white/20 hover:bg-ink-800',
      ].join(' ')}
    >
      <div className={`transition-transform duration-500 ${active ? 'scale-110' : 'group-hover:scale-105'}`}>
        {icon}
      </div>
      <div>
        <div className="font-display text-2xl text-white leading-tight">{label}</div>
        <div className="text-xs text-bone-400 mt-1">{hint}</div>
      </div>
    </button>
  );
}

function TyreIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="36" cy="36" r="30" stroke="#F5525E" strokeWidth="2" />
      <circle cx="36" cy="36" r="12" stroke="white" strokeWidth="1.5" />
      <circle cx="36" cy="36" r="3" fill="#F5525E" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * 2 * Math.PI;
        const x1 = 36 + 24 * Math.cos(a);
        const y1 = 36 + 24 * Math.sin(a);
        const x2 = 36 + 30 * Math.cos(a);
        const y2 = 36 + 30 * Math.sin(a);
        return <line key={i} x1={Math.round(x1 * 100) / 100} y1={Math.round(y1 * 100) / 100} x2={Math.round(x2 * 100) / 100} y2={Math.round(y2 * 100) / 100} stroke="white" strokeWidth="1.5" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function TubeIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="36" cy="36" r="26" stroke="#F5525E" strokeWidth="2" />
      <circle cx="36" cy="36" r="14" stroke="#F5525E" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M36 10v-4M40 6h-8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <rect x="34" y="6" width="4" height="6" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
