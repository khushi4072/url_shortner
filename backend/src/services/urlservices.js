import { query } from '@/lib/db';

const createShortUrl = async (originalurl) => {
    const shorturl = Math.random().toString(36).substring(2, 8);

    // SAVES TO REAL DB
    await query(
        'INSERT INTO URL (ORIGINAL_URL, SHORT_URL) VALUES ($1, $2)',
        [originalurl, shorturl]
    );

    return shorturl;
}

const getOriginalUrl = async (shorturl) => {
    // FETCHES FROM REAL DB
    const result = await query(
        'SELECT ORIGINAL_URL FROM URL WHERE SHORT_URL = $1',
        [shorturl]
    );

    if (result.rows.length > 0) {
        // INCREMENTS CLICKS IN DB
        await query(
            'UPDATE URL SET CLICK = CLICK + 1 WHERE SHORT_URL = $1',
            [shorturl]
        );
        return result.rows[0].original_url;
    }

    return null;
}

export default { createShortUrl, getOriginalUrl };