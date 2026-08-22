import Hero from '@/components/Hero';
import TyreSelector from '@/components/TyreSelector';
import FeaturedRange from '@/components/FeaturedRange';
import FeatureGrid from '@/components/FeatureGrid';
import Testimonials from '@/components/Testimonials';
import CtaBanner from '@/components/CtaBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TyreSelector />
      <FeaturedRange />
      <FeatureGrid />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
