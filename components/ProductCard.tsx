import Link from 'next/link';
import { ProductImage } from './ProductImage';
import type { Product } from '@/lib/products';

export function ProductCard({ product, size = 220 }: { product: Product; size?: number }) {
  const badge = product.brand;
  const meta = product.loadIndex
    ? `${product.sizes[0]} · ${product.loadIndex}`
    : `${product.sizes.length} sizes · Universal`;

  return (
    <Link
      href={`/tyres/${product.slug}`}
      className="group relative block surface p-6 hover:border-ember-500/30 transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-square mb-5">
        <ProductImage
          src={product.image}
          alt={product.name}
          size={size}
          frameClassName="rounded-xl"
          className="absolute inset-0"
          variant={product.imageVariant}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
        />
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-ink-950/95 md:bg-ink-950/85 md:backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider text-bone-100 border border-white/[0.08]">
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
