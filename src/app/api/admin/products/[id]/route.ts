
// src/app/api/admin/products/[id]/route.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'telisweb@alchosting.xyz').split(',');

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

// GET: Fetch a single product
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(data);
}

// PUT: Update a product
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    try {
        const productData = await request.json();

        // Add validation logic here

        const { data, error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
             console.error('Supabase update error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data);

    } catch (e) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}

// DELETE: Delete a product
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;

    // Optional: Also delete associated storage items like images if necessary
    
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
}
