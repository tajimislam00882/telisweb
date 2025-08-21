// src/app/api/admin/products/route.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_EMAILS = ['telisweb@alchosting.xyz'];

async function getSupabaseAdmin() {
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

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
        return null;
    }
    
    // For admin operations, it's often better to use the service role key
    // This should be done carefully and only in secure server environments
    // For this implementation, we will proceed with the user's session if they are an admin.
    return supabase;
}

// GET: Fetch all products
export async function GET(request: Request) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// POST: Create a new product
export async function POST(request: Request) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const productData = await request.json();

        // Here you would add validation logic with Zod, for example.
        // For simplicity, we're assuming the data is valid.

        const { data, error } = await supabase
            .from('products')
            .insert(productData)
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data, { status: 201 });

    } catch (e) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
