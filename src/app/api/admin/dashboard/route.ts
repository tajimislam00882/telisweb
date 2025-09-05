
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { startOfMonth, subMonths, format } from 'date-fns';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'telisweb@alchosting.xyz').split(',');

async function getSupabaseServiceRole() {
    const cookieStore = cookies();
    // IMPORTANT: Use the service role key to perform admin actions
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
    return supabase;
}

export async function GET(request: Request) {
    const cookieStore = cookies();
    
    // First, check if the calling user is an admin
    const supabaseUserClient = createServerClient(
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

    const { data: { user }, error: userError } = await supabaseUserClient.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ error: 'Unauthorized: Could not retrieve user.' }, { status: 401 });
    }

    if (!ADMIN_EMAILS.includes(user.email || '')) {
        return NextResponse.json({ error: 'Unauthorized: Not an admin.' }, { status: 401 });
    }

    // If user is admin, use the service role client to fetch all data
    const supabase = await getSupabaseServiceRole();

    try {
        // Fetch Total Revenue and Sales from 'orders' table
        const { data: ordersData, error: ordersError } = await supabase
            .from('orders')
            .select('id, total_amount, created_at')
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
                    email,
                    raw_user_meta_data
                )
            `)
            .order('created_at', { ascending: false })
            .limit(5);

        if (recentOrdersError) throw recentOrdersError;

         // --- Chart Data ---
        
        // 1. Monthly Revenue
        const monthlyRevenue: { month: string; revenue: number }[] = [];
        const monthLabels: string[] = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const date = subMonths(now, i);
            monthLabels.push(format(date, 'MMM yyyy'));
            monthlyRevenue.push({ month: format(date, 'MMM'), revenue: 0 });
        }

        ordersData.forEach(order => {
            const month = format(new Date(order.created_at), 'MMM');
            const monthIndex = monthlyRevenue.findIndex(m => m.month === month);
            if (monthIndex > -1) {
                monthlyRevenue[monthIndex].revenue += order.total_amount;
            }
        });
        
        // 2. Sales by Category
        const { data: categorySales, error: categoryError } = await supabase
            .from('order_items')
            .select(`
                products (
                    category
                )
            `)
            .in('order_id', ordersData.map(o => (o as any).id));

        if (categoryError) throw categoryError;

        const salesByCategoryMap = new Map<string, number>();
        categorySales?.forEach(item => {
            if (item.products?.category) {
                const category = item.products.category;
                salesByCategoryMap.set(category, (salesByCategoryMap.get(category) || 0) + 1);
            }
        });
        
        const salesByCategory = Array.from(salesByCategoryMap, ([category, sales]) => ({ category, sales }));


        return NextResponse.json({
            stats: {
                totalRevenue,
                totalSales,
                totalUsers,
            },
            recentOrders,
            monthlyRevenue,
            salesByCategory,
        });

    } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json({ error: error.message || 'An internal server error occurred.' }, { status: 500 });
    }
}
