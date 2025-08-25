
import HeroSection from '@/components/home/hero-section';
import PopularProducts from '@/components/home/popular-products';
import Testimonials from '@/components/home/testimonials';
import type { HomepageSettings } from '@/lib/types';

async function getHomepageSettings(): Promise<HomepageSettings> {
    // Return default settings for static export.
    // Dynamic fetching is removed to be compatible with GitHub Pages.
    return {
        hero_title: "Bangladesh's Best Digital Product Shop",
        hero_subtitle: "Get quality e-books, software, templates and much more here.",
        hero_cta_text: "Start Shopping"
    };
}


export default async function HomePage() {
  const settings = await getHomepageSettings();

  return (
    <>
      <HeroSection settings={settings} />
      <PopularProducts />
      <Testimonials />
    </>
  );
}
