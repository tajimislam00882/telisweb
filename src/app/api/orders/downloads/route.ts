
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// This API route fetches the downloadable products for the currently logged-in user.
export async function GET(request: Request) {
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

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch all completed orders for the current user.
    const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'completed');

    if (ordersError) {
        console.error("Error fetching user's orders:", ordersError);
        return NextResponse.json({ error: "Could not retrieve your orders." }, { status: 500 });
    }

    if (!orders || orders.length === 0) {
        return NextResponse.json([]); // No completed orders, so no downloads.
    }

    const orderIds = orders.map(o => o.id);

    // 2. Fetch all order items from those completed orders, joining with product data
    // to get the product name and most importantly, the digital_file_url.
    const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select(`
            id,
            order_id,
            products (
                name,
                image_url,
                digital_file_url
            )
        `)
        .in('order_id', orderIds)
        .not('products.digital_file_url', 'is', null); // Only include items that have a download link

    if (itemsError) {
        console.error("Error fetching order items:", itemsError);
        return NextResponse.json({ error: "Could not retrieve your downloadable products." }, { status: 500 });
    }

    // We use a map to filter out duplicate products if bought multiple times.
    // The key is the product name.
    const uniqueDownloads = new Map();
    orderItems?.forEach(item => {
        if (item.products) {
            uniqueDownloads.set(item.products.name, item);
        }
    });

    return NextResponse.json(Array.from(uniqueDownloads.values()));
}
