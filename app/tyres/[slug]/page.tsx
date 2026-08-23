import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, products } from '@/lib/products';
import { TyreArt } from '@/components/TyreArt';
import { ProductCard } from '@/components/ProductCard';
import { WhatsAppIcon } from '@/components/Nav';
import { whatsappUrl } from '@/lib/site';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: 'Product — Pioneer Tyre' };
  return {
    title: `${p.name} — Pioneer Tyre`,
    description: p.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const inquiryText = `Hi, I'd like a quote for the ${product.name} (${product.sizes[0]}). Please share pricing and availability.`;
  const other = products.filter((p) => p.slug !== product.slug);

  const specRows = [
    { label: 'Brand', value: product.brand },
    { label: 'Series', value: product.series },
    { label: 'Category', value: product.category === 'tyre' ? 'Tuk-Tuk Tyre' : 'Inner Tube' },
    ...(product.loadIndex ? [{ label: 'Load Index', value: product.loadIndex }] : []),
    ...(product.speedRating ? [{ label: 'Speed Rating', value: product.speedRating }] : []),
    { label: 'Sizes', value: product.sizes.join(' · ') },
    ...product.specs,
    { label: 'Warranty', value: product.warranty },
  ];

  return (
    <>
      <section className="relative pt-28 pb-16 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(225,29,46,0.12),transparent_50%)]" />
        <div className="container-x relative">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-bone-400 uppercase tracking-[0.18em]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ember-400">Home</Link>
            <span>/</span>
            <Link href="/tyres" className="hover:text-ember-400">Products</Link>
            <span>/</span>
            <span className="text-bone-100">{product.name}</span>
          </nav>

          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 items-start">
            {/* Visual */}
            <div className="lg:col-span-5">
              <div className="reveal relative aspect-square rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-ink-800 to-ink-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.14),transparent_60%)]" />
                <div className="absolute inset-6 rounded-full border border-white/[0.06]" />
                <div className="absolute inset-12 rounded-full border border-white/[0.05]" />
                <TyreArt size={340} pattern={product.tread ?? 'rib'} />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-7">
              <div className="reveal">
                <div className="eyebrow">{product.series}</div>
                <h1 className="display text-display-lg mt-3 text-balance">{product.name}</h1>
                <p className="mt-5 text-xl text-bone-100 italic font-display">{product.tagline}</p>
                <p className="mt-6 text-bone-300 leading-relaxed">{product.description}</p>
              </div>

              {/* Sizes */}
              <div className="reveal reveal-delay-1 mt-8">
                <div className="text-xs uppercase tracking-[0.2em] text-bone-400 mb-3">Available sizes</div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <span key={s} className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-bone-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick specs */}
              <div className="reveal reveal-delay-2 mt-8 grid gap-3 sm:grid-cols-2">
                {product.specs.slice(0, 4).map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/[0.06] bg-ink-800/60 px-4 py-3">
                    <div className="text-[10px] uppercase tracking-widest text-bone-400">{s.label}</div>
                    <div className="text-sm text-white font-medium mt-1">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-3">
                <a href={whatsappUrl(inquiryText)} target="_blank" rel="noreferrer" className="btn-primary">
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp for pricing
                </a>
                <Link href="/tyres" className="btn-ghost">
                  ← Back to products
                </Link>
              </div>

              <div className="reveal reveal-delay-4 mt-8 flex items-center gap-3 text-sm text-bone-300">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L2 4v4c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V4L8 1z" stroke="#F5525E" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M5.5 8L7 9.5 10.5 6" stroke="#F5525E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {product.warranty}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="container-x">
          <div className="reveal mb-10">
            <div className="eyebrow">Engineering</div>
            <h2 className="display text-display-md mt-3">What makes it different.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {product.features.map((f, i) => (
              <div key={f.title} className={`reveal reveal-delay-${i + 1} surface p-8 hover:border-ember-500/25 transition-colors`}>
                <div className="font-display text-3xl text-ember-500/60 mb-4">0{i + 1}</div>
                <div className="font-display text-xl text-white leading-tight">{f.title}</div>
                <p className="mt-3 text-bone-300 text-[15px] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full spec sheet */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Specifications</div>
              <h2 className="display text-display-md mt-3">The full sheet.</h2>
              <p className="mt-4 text-bone-300">Everything printed on the sidewall — and everything that isn&apos;t.</p>
            </div>
            <div className="lg:col-span-8">
              <dl className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                {specRows.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-sm text-bone-400 uppercase tracking-wider shrink-0">{s.label}</dt>
                    <dd className="text-right text-white font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Other product */}
      {other.length > 0 && (
        <section className="py-20 border-t border-white/[0.05]">
          <div className="container-x">
            <div className="reveal flex items-end justify-between gap-6 mb-10">
              <h2 className="display text-display-md">Also in the range.</h2>
              <Link href="/tyres" className="text-sm text-ember-400 hover:text-ember-300">See all →</Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {other.map((p) => (
                <ProductCard key={p.slug} product={p} size={180} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
