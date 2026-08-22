import Link from 'next/link';
import { TyreArt } from './TyreArt';
import type { Product } from '@/lib/products';

export function ProductCard({ product, size = 200 }: { product: Product; size?: number }) {
  const badge = product.category === 'tyre' ? 'Tuk-Tuk Tyre' : 'Inner Tube';
  const meta = product.loadIndex
    ? `${product.sizes[0]} · ${product.loadIndex}`
    : `${product.sizes.length} sizes · Universal`;

  return (
    <Link
      href={`/tyres/${product.slug}`}
      className="group relative block surface p-6 hover:border-ember-500/30 transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-square flex items-center justify-center rounded-xl bg-ink-900 overflow-hidden mb-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.14),transparent_60%)]" />
        <TyreArt size={size} pattern={product.tread ?? 'rib'} />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-ink-950/80 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider text-bone-100 border border-white/[0.08]">
          <span className="w-1 h-1 rounded-full bg-ember-500" />
          {badge}
        </div>
      </div>

      <div className="text-[11px] text-ember-400 uppercase tracking-wider">{product.series}</div>
      <div className="mt-1 font-display text-2xl text-white leading-tight">{product.name}</div>
      <p className="mt-2 text-sm text-bone-300 line-clamp-2">{product.tagline}</p>

      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
        <div className="text-bone-300">{meta}</div>
        <span className="text-ember-400 font-medium group-hover:translate-x-1 transition-transform">
          View →
        </span>
      </div>
    </Link>
  );
}
