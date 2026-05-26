import { NextResponse } from 'next/server';
import urlService from '@/lib/services/urlService';

export async function POST(request: Request) {
  try {
    const { originalUrl } = await request.json();

    if (!originalUrl) {
      return NextResponse.json({ error: 'Missing originalUrl' }, { status: 400 });
    }

    const shortUrl = await urlService.createShortUrl(originalUrl);

    return NextResponse.json({ shortUrl });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
