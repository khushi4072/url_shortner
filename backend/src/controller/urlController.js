
const express = require('express');
const router = express.Router();
const { createShortUrl, getOriginalUrl } = require('../services/urlService');
const createshorturl = (req, resp) => {
    const { originalurl } = req.body;
    const shorturl = createShortUrl(originalurl);
    resp.json({ shorturl });
}
const getoriginalurl = (req, resp) => {
    const { shorturl } = req.body;
    const originalurl = getOriginalUrl(shorturl);
    resp.json({ originalurl });
}
module.exports = { createshorturl, getoriginalurl };



