
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_EMAILS = ['telisweb@alchosting.xyz'];

async function getSupabaseAdmin() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    // Verify the user is an admin before returning the service role client
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
        return null;
    }
    
    return supabase;
}

export async function GET(request: Request) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Fetch Total Revenue and Sales from 'orders' table
        const { data: ordersData, error: ordersError } = await supabase
            .from('orders')
            .select('total_amount')
            .eq('status', 'completed');
        
        if (ordersError) throw ordersError;

        const totalRevenue = ordersData.reduce((sum, order) => sum + order.total_amount, 0);
        const totalSales = ordersData.length;
        
        // Fetch Total Users
        const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
        if (usersError) throw usersError;
        const totalUsers = usersData.users.length;


        // Fetch Recent Orders
        const { data: recentOrders, error: recentOrdersError } = await supabase
            .from('orders')
            .select(`
                *,
                users (
                    raw_user_meta_data
                )
            `)
            .order('created_at', { ascending: false })
            .limit(5);

        if (recentOrdersError) throw recentOrdersError;

        return NextResponse.json({
            stats: {
                totalRevenue,
                totalSales,
                totalUsers,
            },
            recentOrders,
        });

    } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
