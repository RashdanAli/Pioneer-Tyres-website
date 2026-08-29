'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';
import { products, filterOptions, type Category } from '@/lib/products';

export default function CatalogFilters() {
  const [category, setCategory] = useState<Category | null>(null);

  // The site is statically exported, so ?category= can't be read on the server.
  // Render every product into the HTML, then narrow it down once we're on the
  // client and can see the query string.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get('category');
    if (c === 'tyre' || c === 'tube') setCategory(c);
  }, []);

  const filtered = useMemo(
    () => products.filter((p) => (category ? p.category === category : true)),
    [category],
  );

  const clear = () => setCategory(null);
  const hasFilter = !!category;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Sidebar */}
      <aside className="lg:col-span-3">
        <div className="sticky top-24 space-y-8">
          <div className="flex items-center justify-between mb-4">
            <div className="eyebrow">Filters</div>
            {hasFilter && (
              <button
                onClick={clear}
                className="text-xs text-bone-300 hover:text-ember-400 transition-colors uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>

          <FilterGroup title="Category">
            {filterOptions.category.map((opt) => (
              <FilterPill
                key={opt.value}
                active={category === opt.value}
                onClick={() => setCategory(category === opt.value ? null : opt.value)}
              >
                {opt.label}
              </FilterPill>
            ))}
          </FilterGroup>

          <p className="text-xs text-bone-400 leading-relaxed border-t border-white/[0.06] pt-6">
            Our range is intentionally focused —
            <span className="text-bone-100"> just 2 products</span>, each engineered to do one job exceptionally well.
          </p>
        </div>
      </aside>

      {/* Grid */}
      <div className="lg:col-span-9">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-bone-300">
            <span className="text-white font-medium">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'product' : 'products'}
            {hasFilter && <span className="text-bone-400"> in this category</span>}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} size={200} />
            ))}
          </div>
        ) : (
          <div className="surface p-14 text-center">
            <div className="font-display text-2xl text-white">No products match that filter.</div>
            <p className="text-bone-300 mt-3">Try clearing to see the full range.</p>
            <button onClick={clear} className="btn-outline mt-6">Clear filter</button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-bone-400 mb-3">{title}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200 cursor-pointer border',
        active
          ? 'bg-ember-500 border-ember-500 text-white'
          : 'bg-white/[0.02] border-white/10 text-bone-100 hover:border-white/25 hover:bg-white/[0.06]',
      ].join(' ')}
    >
      {children}
    </button>
  );
}
