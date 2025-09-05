
// src/app/api/admin/products/route.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

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
        const digitalFile = formData.get('digital_file') as File | null;
        
        if (!imageFile) {
            return NextResponse.json({ error: 'Product image is required.' }, { status: 400 });
        }

        // 1. Upload Product Image
        const imageExt = imageFile.name.split('.').pop();
        const imagePath = `products/images/${uuidv4()}.${imageExt}`;
        const { data: imageData, error: imageError } = await supabase.storage
            .from('products')
            .upload(imagePath, imageFile);

        if (imageError) {
            console.error("Image upload failed:", imageError);
            throw new Error(`Image upload failed: ${imageError.message}`);
        }

        const { data: { publicUrl: imageUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(imagePath);

        // 2. Upload Digital File (if provided)
        let digitalFileUrl: string | null = null;
        let fileSize: string | null = null;
        let fileType: string | null = null;

        if (digitalFile) {
            const digitalFileExt = digitalFile.name.split('.').pop();
            const digitalFilePath = `products/files/${uuidv4()}.${digitalFileExt}`;
            const { error: fileError } = await supabase.storage
                .from('products')
                .upload(digitalFilePath, digitalFile);

            if (fileError) {
                await supabase.storage.from('products').remove([imagePath]); // Clean up image
                console.error("Digital file upload failed:", fileError);
                throw new Error(`Digital file upload failed: ${fileError.message}`);
            }

            const { data: { publicUrl } } = supabase.storage
              .from('products')
              .getPublicUrl(digitalFilePath);
            
            digitalFileUrl = publicUrl;
            fileSize = `${(digitalFile.size / 1024 / 1024).toFixed(2)}MB`;
            fileType = digitalFileExt || 'file';
        }

        // 3. Prepare product data for insertion
        const tagsValue = formData.get('tags') as string;
        const tags = tagsValue ? tagsValue.split(',').map(tag => tag.trim()).filter(Boolean) : [];

        const getFloat = (key: string) => {
            const val = formData.get(key) as string;
            return val ? parseFloat(val) : null;
        }
        const getInt = (key: string) => {
            const val = formData.get(key) as string;
            return val ? parseInt(val, 10) : null;
        }
        const getBool = (key: string) => (formData.get(key) as string) === 'true';

        const productData = {
            id: formData.get('id') as string,
            name: formData.get('name') as string,
            description: formData.get('description') as string | null,
            price: getFloat('price') || 0,
            category: formData.get('category') as string,
            tags: tags,
            image_url: imageUrl,
            digital_file_url: digitalFileUrl,
            file_size: fileSize,
            file_type: fileType,
            business_model_id: getInt('business_model_id') || 1,
            affiliate_url: formData.get('affiliate_url') as string | null,
            commission_rate: getFloat('commission_rate'),
            supplier_price: getFloat('supplier_price'),
            min_stock_alert: getInt('min_stock_alert'),
            auto_restock: getBool('auto_restock'),
            shipping_weight: getFloat('shipping_weight'),
            rating: 0,
            reviews: 0,
        };

        // 4. Insert into database
        const { data, error: insertError } = await supabase
            .from('products')
            .insert([productData])
            .select()
            .single();

        if (insertError) {
            // If DB insert fails, clean up uploaded files
            await supabase.storage.from('products').remove([imagePath]);
            if (digitalFileUrl) {
                const digitalFilePath = `files/${digitalFileUrl.split('/files/')[1]}`;
                await supabase.storage.from('products').remove([digitalFilePath]);
            }
            console.error('Supabase insert error:', insertError);
            throw new Error(`Database insert failed: ${insertError.message}`);
        }

        return NextResponse.json(data, { status: 201 });

    } catch (e: any) {
        console.error("API Error in POST /api/admin/products:", e.message);
        return NextResponse.json({ error: 'Invalid request or server error' }, { status: 500 });
    }
}
