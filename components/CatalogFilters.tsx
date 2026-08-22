'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';
import { products, filterOptions, type Vehicle, type UseCase, type Tread } from '@/lib/products';

export default function CatalogFilters({
  initialVehicle,
}: {
  initialVehicle?: Vehicle | null;
}) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(initialVehicle ?? null);
  const [useCase, setUseCase] = useState<UseCase | null>(null);
  const [tread, setTread] = useState<Tread | null>(null);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (vehicle && p.vehicle !== vehicle) return false;
        if (useCase && !p.useCase.includes(useCase)) return false;
        if (tread && p.tread !== tread) return false;
        return true;
      }),
    [vehicle, useCase, tread],
  );

  const clear = () => {
    setVehicle(null);
    setUseCase(null);
    setTread(null);
  };

  const hasFilter = vehicle || useCase || tread;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Sidebar */}
      <aside className="lg:col-span-3">
        <div className="sticky top-24 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="eyebrow">Filters</div>
              {hasFilter && (
                <button onClick={clear} className="text-xs text-bone-300 hover:text-ember-400 transition-colors uppercase tracking-wider">
                  Clear
                </button>
              )}
            </div>
          </div>

          <FilterGroup title="Vehicle">
            {filterOptions.vehicle.map((opt) => (
              <FilterPill
                key={opt.value}
                active={vehicle === opt.value}
                onClick={() => setVehicle(vehicle === opt.value ? null : opt.value)}
              >
                {opt.label}
              </FilterPill>
            ))}
          </FilterGroup>

          <FilterGroup title="Use case">
            {filterOptions.useCase.map((opt) => (
              <FilterPill
                key={opt.value}
                active={useCase === opt.value}
                onClick={() => setUseCase(useCase === opt.value ? null : opt.value)}
              >
                {opt.label}
              </FilterPill>
            ))}
          </FilterGroup>

          <FilterGroup title="Tread">
            {filterOptions.tread.map((opt) => (
              <FilterPill
                key={opt.value}
                active={tread === opt.value}
                onClick={() => setTread(tread === opt.value ? null : opt.value)}
              >
                {opt.label}
              </FilterPill>
            ))}
          </FilterGroup>
        </div>
      </aside>

      {/* Grid */}
      <div className="lg:col-span-9">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-bone-300">
            <span className="text-white font-medium">{filtered.length}</span> tyres
            {hasFilter && <span className="text-bone-400"> matching your filters</span>}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} size={180} />
            ))}
          </div>
        ) : (
          <div className="surface p-14 text-center">
            <div className="font-display text-2xl text-white">No tyres match those filters.</div>
            <p className="text-bone-300 mt-3">Try broadening or clearing.</p>
            <button onClick={clear} className="btn-outline mt-6">Clear filters</button>
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
