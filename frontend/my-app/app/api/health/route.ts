import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Simple query to check connection
    const result = await query('SELECT NOW()');
    return NextResponse.json({ 
      status: 'Database connected', 
      time: result.rows[0].now 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'Database connection failed', 
      error: error.message 
    }, { status: 500 });
  }
}
