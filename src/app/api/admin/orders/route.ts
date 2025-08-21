
import { createServerClient } from '@supabase/ssr';
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
    
    return supabase;
}

// GET: Fetch all orders with user info
export async function GET(request: Request) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Join with users table to get customer name
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            users (
                raw_user_meta_data
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
