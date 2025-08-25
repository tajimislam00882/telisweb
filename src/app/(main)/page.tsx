
import HeroSection from '@/components/home/hero-section';
import PopularProducts from '@/components/home/popular-products';
import Testimonials from '@/components/home/testimonials';
import type { HomepageSettings } from '@/lib/types';

// Using default settings for static export to be compatible with static hosting.
const staticHomepageSettings: HomepageSettings = {
    hero_title: "Bangladesh's Best Digital Product Shop",
    hero_subtitle: "Get quality e-books, software, templates and much more here.",
    hero_cta_text: "Start Shopping"
};


export default async function HomePage() {
  const settings = staticHomepageSettings;

  return (
    <>
      <HeroSection settings={settings} />
      <PopularProducts />
      <Testimonials />
    </>
  );
}
