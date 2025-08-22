
import HeroSection from '@/components/home/hero-section';
import PopularProducts from '@/components/home/popular-products';
import Testimonials from '@/components/home/testimonials';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { HomepageSettings } from '@/lib/types';

async function getHomepageSettings(): Promise<HomepageSettings> {
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
    
    // If data is successfully fetched and settings exist, return them.
    if (data && data.settings) {
        return data.settings as HomepageSettings;
    }
    
    // If there's an error, but it's the expected "no rows found" error,
    // we don't need to log it. We'll proceed to return defaults.
    // We only log an error if it's an *unexpected* database issue.
    if (error && error.code !== 'PGRST116') {
        console.error("Unexpected error fetching homepage settings:", error);
    }
    
    // For any other case (no data, no settings, or PGRST116 error), return defaults.
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
