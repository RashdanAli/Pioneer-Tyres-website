import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export default function FeaturedRange() {
  const featured = getFeaturedProducts();
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container-x">
        <div className="reveal flex items-end justify-between gap-6 mb-14 flex-wrap">
          <div className="max-w-xl">
            <div className="eyebrow">The Range</div>
            <h2 className="display text-display-lg mt-4 text-balance">
              Two products.<br />
              <span className="italic text-ember-500">Both, done right.</span>
            </h2>
          </div>
          <Link href="/tyres" className="btn-outline shrink-0">
            View all products
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((p, i) => (
            <div key={p.slug} className={`reveal reveal-delay-${(i % 4) + 1}`}>
              <ProductCard product={p} size={220} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
