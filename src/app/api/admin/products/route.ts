
// src/app/api/admin/products/route.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

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
    
    // For admin operations that require elevated privileges,
    // it's better to create a service role client.
    // However, for user-authenticated admin actions like this,
    // the user's session is sufficient.
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
        const formData = await request.formData();
        
        const imageFile = formData.get('product_image') as File | null;
        
        if (!imageFile) {
            return NextResponse.json({ error: 'Product image is required.' }, { status: 400 });
        }

        const imageExt = imageFile.name.split('.').pop();
        const imagePath = `products/${uuidv4()}.${imageExt}`;

        const { data: imageData, error: imageError } = await supabase.storage
            .from('products')
            .upload(imagePath, imageFile);

        if (imageError) {
            throw new Error(`Image upload failed: ${imageError.message}`);
        }

        const { data: { publicUrl: imageUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(imagePath);

        const productData = {
            id: formData.get('id') as string,
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            price: parseFloat(formData.get('price') as string),
            category: formData.get('category') as string,
            tags: (formData.get('tags') as string)?.split(',').map(tag => tag.trim()) || [],
            image_url: imageUrl,
            business_model_id: parseInt(formData.get('business_model_id') as string, 10),
            affiliate_url: formData.get('affiliate_url') as string,
            commission_rate: parseFloat(formData.get('commission_rate') as string),
            supplier_price: parseFloat(formData.get('supplier_price') as string),
            min_stock_alert: parseInt(formData.get('min_stock_alert') as string, 10),
            auto_restock: (formData.get('auto_restock') as string) === 'true',
            shipping_weight: parseFloat(formData.get('shipping_weight') as string),
            rating: 0,
            reviews: 0,
        };

        const { data, error: insertError } = await supabase
            .from('products')
            .insert([productData])
            .select()
            .single();

        if (insertError) {
            // If DB insert fails, attempt to delete the uploaded image
            await supabase.storage.from('products').remove([imagePath]);
            console.error('Supabase insert error:', insertError);
            return NextResponse.json({ error: insertError.message }, { status: 400 });
        }

        return NextResponse.json(data, { status: 201 });

    } catch (e: any) {
        console.error("API Error:", e.message);
        return NextResponse.json({ error: 'Invalid request or server error' }, { status: 500 });
    }
}
