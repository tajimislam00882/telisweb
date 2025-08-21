
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

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

const themeSchema = z.object({
  primary: z.string().regex(/^\d{1,3}\s\d{1,3}%\s\d{1,3}%$/),
  background: z.string().regex(/^\d{1,3}\s\d{1,3}%\s\d{1,3}%$/),
  accent: z.string().regex(/^\d{1,3}\s\d{1,3}%\s\d{1,3}%$/),
});


export async function POST(request: Request) {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
        const body = await request.json();
        const validated = themeSchema.safeParse(body);

        if (!validated.success) {
            console.error(validated.error);
            return NextResponse.json({ error: 'Invalid color format provided.' }, { status: 400 });
        }
        
        const { primary, background, accent } = validated.data;

        // Path to globals.css
        const cssFilePath = path.join(process.cwd(), 'src', 'app', 'globals.css');
        let cssContent = await fs.readFile(cssFilePath, 'utf-8');

        // Replace HSL variables for the dark theme
        cssContent = cssContent.replace(/--primary:\s*[\d\s%]+;/g, `--primary: ${primary};`);
        cssContent = cssContent.replace(/--background:\s*[\d\s%]+;/g, `--background: ${background};`);
        cssContent = cssContent.replace(/--accent:\s*[\d\s%]+;/g, `--accent: ${accent};`);

        await fs.writeFile(cssFilePath, cssContent, 'utf-8');

        return NextResponse.json({ message: 'Theme updated successfully' });

    } catch (e: any) {
        console.error("Error updating theme:", e);
        return NextResponse.json({ error: 'Failed to update theme file.' }, { status: 500 });
    }
}
