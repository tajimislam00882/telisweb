import HeroSection from '@/components/home/hero-section';
import PopularProducts from '@/components/home/popular-products';
import Testimonials from '@/components/home/testimonials';
import CategoryShowcase from '@/components/home/category-showcase';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <PopularProducts />
      <Testimonials />
    </>
  );
}
