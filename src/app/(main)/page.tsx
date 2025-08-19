'use client';

import HeroSection from '@/components/home/hero-section';
import PartnershipSection from '@/components/home/partnership-section';
import PopularProducts from '@/components/home/popular-products';
import Testimonials from '@/components/home/testimonials';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularProducts />
      <PartnershipSection />
      <Testimonials />
    </>
  );
}
