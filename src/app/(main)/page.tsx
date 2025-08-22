import HeroSection from '@/components/home/hero-section';
import PopularProducts from '@/components/home/popular-products';
import Testimonials from '@/components/home/testimonials';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { HomepageSettings } from '@/lib/types';

async function getHomepageSettings() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    const { data, error } = await supabase
        .from('site_settings')
        .select('settings')
        .eq('name', 'homepage')
        .single();
    
    if (error || !data) {
        console.error("Could not fetch homepage settings, returning defaults.", error);
        return {
            hero_title: "Bangladesh's Best Digital Product Shop",
            hero_subtitle: "Get quality e-books, software, templates and much more here.",
            hero_cta_text: "Start Shopping"
        };
    }
    
    return data.settings as HomepageSettings;
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
