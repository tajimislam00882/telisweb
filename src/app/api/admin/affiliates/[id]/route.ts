
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'telisweb@alchosting.xyz').split(',');

async function getSupabaseAdmin() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: { get: (name: string) => cookieStore.get(name)?.value },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
        return null;
    }
    return supabase;
}

const statusUpdateSchema = z.object({
  status: z.enum(['active', 'suspended', 'pending', 'inactive']),
});

// PUT: Update affiliate status
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    try {
        const body = await request.json();
        const validated = statusUpdateSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json({ error: 'Invalid status provided.' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('affiliates')
            .update({ status: validated.data.status })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data);

    } catch (e) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}

// DELETE: Delete an affiliate
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;

    const { error } = await supabase
        .from('affiliates')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Affiliate deleted successfully' }, { status: 200 });
}
