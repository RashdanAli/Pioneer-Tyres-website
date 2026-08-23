'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products, type Category } from '@/lib/products';
import { ProductImage } from './ProductImage';
import { WhatsAppIcon } from './Nav';
import { whatsappUrl } from '@/lib/site';

export default function TyreSelector() {
  const [category, setCategory] = useState<Category | null>(null);
  const match = category ? products.find((p) => p.category === category) : null;

  return (
    <section id="selector" className="relative py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.06),transparent_60%)]" />
      </div>

      <div className="container-x relative">
        <div className="reveal max-w-2xl">
          <div className="eyebrow">The Range</div>
          <h2 className="display text-display-lg mt-4 text-balance">
            What do you <span className="italic text-ember-500">need?</span>
          </h2>
          <p className="mt-5 text-lg text-bone-300 text-pretty">
            Two products — <span className="text-white">Pioneer</span> tuk-tuk tyres and{' '}
            <span className="text-white">Avis</span> inner tubes. Pick one to see the details.
          </p>
        </div>

        {/* Product cards — both visible, click to expand */}
        <div className="reveal reveal-delay-1 mt-12 grid gap-5 md:grid-cols-2">
          {products.map((p) => {
            const active = category === p.category;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setCategory(active ? null : p.category)}
                aria-pressed={active}
                className={[
                  'group relative text-left overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer',
                  'p-5 sm:p-6',
                  active
                    ? 'border-ember-500 bg-gradient-to-b from-ember-500/[0.06] to-ink-800 shadow-[0_0_0_1px_rgba(225,29,46,0.35),0_30px_80px_-25px_rgba(225,29,46,0.55)] -translate-y-1'
                    : 'border-white/[0.08] bg-ink-800 hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)]',
                ].join(' ')}
              >
                <div className="relative aspect-[5/4]">
                  <ProductImage
                    src={p.image}
                    alt={p.name}
                    size={360}
                    frameClassName="rounded-xl"
                    className="absolute inset-0"
                    variant={p.imageVariant}
                    tiltStrength={9}
                    sizes="(max-width: 768px) 90vw, 45vw"
                  />
                  <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink-950/85 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider text-bone-100 border border-white/[0.08]">
                    <span className="w-1 h-1 rounded-full bg-ember-500" />
                    {p.brand}
                  </div>
                  {active && (
                    <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-ember-500 flex items-center justify-center shadow-lg shadow-ember-500/40 animate-fade-in">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6.5l2.5 2.5 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <div className="text-[11px] text-ember-400 uppercase tracking-wider">{p.series}</div>
                  <div className="mt-1 font-display text-2xl md:text-3xl text-white leading-tight">{p.name}</div>
                  <p className="mt-2 text-sm text-bone-300 line-clamp-2">{p.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded match details */}
        {match && (
          <div className="reveal mt-6 surface-elevated p-6 md:p-8 animate-fade-up">
            <div className="grid gap-8 md:grid-cols-12 items-start">
              <div className="md:col-span-8">
                <div className="text-[11px] text-ember-400 uppercase tracking-wider">You picked</div>
                <div className="mt-1 font-display text-3xl text-white leading-tight">{match.name}</div>
                <p className="mt-3 text-bone-100 italic font-display text-lg">{match.tagline}</p>
                <p className="mt-4 text-bone-300 text-[15px] leading-relaxed max-w-2xl">
                  {match.description}
                </p>

                <div className="mt-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-bone-400 mb-2">Available sizes</div>
                  <div className="flex flex-wrap gap-2">
                    {match.sizes.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-bone-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="rounded-xl border border-white/[0.06] bg-ink-800/60 p-4">
                  <div className="text-xs uppercase tracking-widest text-bone-400">Warranty</div>
                  <div className="text-sm text-white font-medium mt-1">{match.warranty}</div>
                </div>
                <div className="mt-3 flex flex-col gap-2.5">
                  <Link
                    href={`/tyres/${match.slug}`}
                    className="btn-primary w-full justify-center"
                  >
                    See full details
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href={whatsappUrl(`Hi, I'd like a quote for the ${match.name}. Please share pricing and availability.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost w-full justify-center"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    WhatsApp for pricing
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
