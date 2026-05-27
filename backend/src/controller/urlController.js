const urlService = require('../services/urlservices');

const createShortUrl = async (req, resp) => {
    const { originalurl } = req.body;
    try {
        const shortCode = await urlService.createShortUrl(originalurl);
        const shorturl = `http://3.209.81.166:3000/${shortCode}`;
        resp.json({ shorturl });
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
}

const getOriginalUrl = async (req, resp) => {
    const { shorturl } = req.params;
    try {
        const originalurl = await urlService.getOriginalUrl(shorturl);
        if (originalurl) {
            resp.json({ originalurl });
        } else {
            resp.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
}

module.exports = { createShortUrl, getOriginalUrl };



