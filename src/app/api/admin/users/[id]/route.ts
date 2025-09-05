
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'telisweb@alchosting.xyz').split(',');

// DELETE: Delete a user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const cookieStore = cookies();
    
    // Check if the deleter is an admin
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
    );
     const { data: { user } } = await supabase.auth.getUser();
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create a service role client to perform admin actions
    const supabaseAdmin = createServerClient(
         process.env.NEXT_PUBLIC_SUPABASE_URL!,
         process.env.SUPABASE_SERVICE_ROLE_KEY!,
         { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
    );
    
    const { id } = params;

    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}
