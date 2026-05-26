const Redis = require('ioredis');

// Local mein ye bina password ke chalega, Server par ye URL process.env se aayega
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

module.exports = redis;