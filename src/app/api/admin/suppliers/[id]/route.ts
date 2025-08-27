
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const ADMIN_EMAILS = ['telisweb@alchosting.xyz'];

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

const supplierUpdateSchema = z.object({
  company_name: z.string().min(1, 'Company name is required').optional(),
  contact_person: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  payment_terms: z.string().optional(),
  shipping_policy: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
});


// PUT: Update supplier
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    try {
        const body = await request.json();
        const validated = supplierUpdateSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json({ error: 'Invalid data provided.' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('suppliers')
            .update(validated.data)
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

// DELETE: Delete a supplier
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;

    const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Supplier deleted successfully' }, { status: 200 });
}
