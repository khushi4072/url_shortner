// Import ko REQUIRE banao
const pool = require('../../Lib/db');

const createShortUrl = async (originalurl) => {
    const shorturl = Math.random().toString(36).substring(2, 8);

    await pool.query(
        'INSERT INTO URL (ORIGINAL_URL, SHORT_URL) VALUES ($1, $2)',
        [originalurl, shorturl]
    );

    return shorturl;
}

const getOriginalUrl = async (shorturl) => {
    const result = await pool.query(
        'SELECT ORIGINAL_URL FROM URL WHERE SHORT_URL = $1',
        [shorturl]
    );

    if (result.rows.length > 0) {
        await pool.query(
            'UPDATE URL SET CLICK = CLICK + 1 WHERE SHORT_URL = $1',
            [shorturl]
        );
        return result.rows[0].original_url;
    }

    return null;
}

module.exports = { createShortUrl, getOriginalUrl };