import { query } from '@/lib/db';

const createShortUrl = async (originalurl: string) => {
    const shorturl = Math.random().toString(36).substring(2, 8);
    
    await query(
        'INSERT INTO URL (ORIGINAL_URL, SHORT_URL) VALUES ($1, $2)',
        [originalurl, shorturl]
    );
    
    return shorturl;
}

const getOriginalUrl = async (shorturl: string) => {
    const result = await query(
      'SELECT * FROM URL WHERE SHORT_URL = $1',
      [shorturl]
    );
    
    if (result.rows.length > 0) {
      // Handle both ORIGINAL_URL and original_url key names
      let original = result.rows[0].original_url || result.rows[0].ORIGINAL_URL;

      // FIX: If the URL doesn't start with http, the browser will stay on localhost.
      // We must add http:// to make it an external redirect.
      if (original && !original.startsWith('http://') && !original.startsWith('https://')) {
        original = `https://${original}`;
      }

      // Increment clicks
      await query(
        'UPDATE URL SET CLICK = CLICK + 1 WHERE SHORT_URL = $1',
        [shorturl]
      );
      
      return original;
    }
    
    return null;
}

export default { createShortUrl, getOriginalUrl };
