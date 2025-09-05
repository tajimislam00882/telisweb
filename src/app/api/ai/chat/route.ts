import { chat } from '@/ai/flows/chatbot-flow';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const ChatRequestSchema = z.object({
    history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
    })),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = ChatRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }

    const { history } = validation.data;
    const result = await chat({ history });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
