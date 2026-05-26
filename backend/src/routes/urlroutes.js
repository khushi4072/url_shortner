const express = require('express');
const router = express.Router();
const { createShortUrl, getOriginalUrl } = require('../controller/urlController');
router.post('/shorturl', createShortUrl);
router.get('/:shorturl', getOriginalUrl);


module.exports = router;


