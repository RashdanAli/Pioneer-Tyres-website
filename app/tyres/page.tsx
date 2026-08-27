import type { Metadata } from 'next';
import CatalogFilters from '@/components/CatalogFilters';
import type { Category } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Products — Pioneer Tyre',
  description: 'Explore the Pioneer Tyre range — tuk-tuk tyres and universal inner tubes. Available across Sri Lanka since 2000.',
};

export default function TyresPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const initialCategory: Category | null =
    searchParams.category === 'tyre' || searchParams.category === 'tube'
      ? (searchParams.category as Category)
      : null;

  return (
    <>
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(225,29,46,0.14),transparent_50%)]" />
        <div className="container-x relative">
          <div className="reveal">
            <div className="eyebrow">The Range</div>
            <h1 className="display text-display-xl mt-4 text-balance max-w-4xl">
              Two products.<br />
              <span className="text-ember-500">Zero compromise.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-bone-300 text-pretty">
              A tuk-tuk tyre and an inner tube — that&apos;s our entire range.
              Built in Sri Lanka, available since 2000.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <CatalogFilters initialCategory={initialCategory} />
        </div>
      </section>
    </>
  );
}
