
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

    const returnDefaults = () => ({
        hero_title: "Bangladesh's Best Digital Product Shop",
        hero_subtitle: "Get quality e-books, software, templates and much more here.",
        hero_cta_text: "Start Shopping"
    });

    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('settings')
            .eq('name', 'homepage')
            .single();

        if (error) {
            // This will catch "PGRST116" (no rows found) and other potential errors.
            // In any error case, we gracefully fall back to defaults without logging.
            return returnDefaults();
        }

        if (data && data.settings) {
            return data.settings as HomepageSettings;
        }

        // If there's no data or no settings property, return defaults.
        return returnDefaults();

    } catch (e) {
        // Catch any unexpected exceptions during the async operation.
        console.error("A critical error occurred while fetching homepage settings:", e);
        return returnDefaults();
    }
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
