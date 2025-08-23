
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_EMAILS = ['telisweb@alchosting.xyz'];

// GET: Fetch all users (admin only)
export async function GET(request: Request) {
    const cookieStore = cookies();
    
    // First, check if the user is an admin
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
    
    const { data: { user } } = await supabaseUserClient.auth.getUser();
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // If user is admin, use the service role client to fetch users
    const supabaseAdmin = createServerClient(
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

    try {
        const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({
            sortBy: 'created_at',
            sortOrder: 'desc'
        });
        
        if (error) {
            console.error('Error fetching users:', error);
            return NextResponse.json({ error: 'Failed to fetch users. Ensure SUPABASE_SERVICE_ROLE_KEY is set.' }, { status: 500 });
        }

        return NextResponse.json({ users });
    } catch (e: any) {
        console.error('Server error in /api/admin/users:', e);
        return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
    }
}
