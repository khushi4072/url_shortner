import { redirect } from 'next/navigation';
import redis from '@/lib/redis';
import pool from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortUrl: string }> }
) {
  const { shortUrl } = await params;

  // 1. Pehle REDIS (Cache) mein dekho
  // Alternative Server logic: Server par cache hit hone se DB ki cost bachti hai
  const cachedUrl = await redis.get(shortUrl);

  if (cachedUrl) {
    console.log("🚀 CACHE HIT: Database ko chuna bhi nahi pada!");
    return redirect(cachedUrl.startsWith('http') ? cachedUrl : `https://${cachedUrl}`);
  }

  // 2. Agar Redis mein nahi hai (Cache Miss), tab POSTGRES mein dekho
  console.log("🐢 CACHE MISS: Database se mangwana pad raha hai...");
  const result = await pool.query(
    'SELECT ORIGINAL_URL FROM URL WHERE SHORT_URL = $1',
    [shortUrl]
  );

  if (result.rows.length > 0) {
    const originalUrl = result.rows[0].original_url;

    // 3. Agli baar ke liye REDIS mein save kar do (Set Expiry: 24 hours)
    // Alternative: Server par hum 'EX' (Expiry) zaroor lagate hain taaki RAM full na ho jaye
    await redis.set(shortUrl, originalUrl, 'EX', 86400);

    return redirect(originalUrl.startsWith('http') ? originalUrl : `https://${originalUrl}`);
  }

  return new Response('Not Found', { status: 404 });
}