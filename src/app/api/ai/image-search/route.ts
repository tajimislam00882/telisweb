import { imageSearch } from '@/ai/flows/image-search-flow';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageDataUri } = await request.json();

    if (!imageDataUri) {
      return NextResponse.json(
        { error: 'imageDataUri is required' },
        { status: 400 }
      );
    }

    const result = await imageSearch({ imageDataUri });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Image search API error:', error);
    return NextResponse.json(
      { error: error.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
