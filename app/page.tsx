import Hero from '@/components/Hero';
import TyreSelector from '@/components/TyreSelector';
import ProductSlides from '@/components/ProductSlides';
import FeatureGrid from '@/components/FeatureGrid';
import CtaBanner from '@/components/CtaBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TyreSelector />
      <ProductSlides />
      <FeatureGrid />
      <CtaBanner />
    </>
  );
}
