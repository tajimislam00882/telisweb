
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const ADMIN_EMAILS = ['telisweb@alchosting.xyz'];

async function getSupabaseAdmin() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: { get: (name: string) => cookieStore.get(name)?.value },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
        return null;
    }
    return supabase;
}

const homepageSettingsSchema = z.object({
  hero_title: z.string(),
  hero_subtitle: z.string(),
  hero_cta_text: z.string(),
});

// GET: Fetch homepage settings
export async function GET(request: Request) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('site_settings')
        .select('settings')
        .eq('name', 'homepage')
        .single();

    if (error) {
        // If no settings exist, return default values
        if (error.code === 'PGRST116') {
             return NextResponse.json({
                settings: {
                    hero_title: "Bangladesh's Best Digital Product Shop",
                    hero_subtitle: "Get quality e-books, software, templates and much more here.",
                    hero_cta_text: "Start Shopping"
                }
             });
        }
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
}

// PUT: Update homepage settings
export async function PUT(request: Request) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
        const body = await request.json();
        const validated = homepageSettingsSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json({ error: validated.error.errors }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('site_settings')
            .upsert({ name: 'homepage', settings: validated.data }, { onConflict: 'name' })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data);

    } catch (e) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
