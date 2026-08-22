import type { Metadata } from 'next';
import CatalogFilters from '@/components/CatalogFilters';
import type { Vehicle } from '@/lib/products';

export const metadata: Metadata = {
  title: 'All Tyres — Pioneer Cooper',
  description: 'Explore every Pioneer Cooper tyre for motorbikes and tuk-tuks. Filter by vehicle, use case, and tread.',
};

export default function TyresPage({
  searchParams,
}: {
  searchParams: { vehicle?: string };
}) {
  const initialVehicle: Vehicle | null =
    searchParams.vehicle === 'motorbike' || searchParams.vehicle === 'tuktuk'
      ? (searchParams.vehicle as Vehicle)
      : null;

  return (
    <>
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(225,29,46,0.14),transparent_50%)]" />
        <div className="container-x relative">
          <div className="reveal">
            <div className="eyebrow">The Range</div>
            <h1 className="display text-display-xl mt-4 text-balance max-w-4xl">
              Every tyre we make.<br />
              <span className="italic text-ember-500">One page.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-bone-300 text-pretty">
              Filter by vehicle, riding style, or tread. Every tyre is built in Sri Lanka for Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <CatalogFilters initialVehicle={initialVehicle} />
        </div>
      </section>
    </>
  );
}
