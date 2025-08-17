import HeroSection from '@/components/home/hero-section';
import PopularProducts from '@/components/home/popular-products';
import Testimonials from '@/components/home/testimonials';
import TrustBadges from '@/components/home/trust-badges';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularProducts />
      <Testimonials />
      <TrustBadges />
    </>
  );
}
