// import ki jagah require use karo
const { Pool } = require('pg');

const pool = new Pool({
    user: 'khushisingh',
    host: 'localhost', // AWS par database setup hone ke baad isse change karna pad sakta hai
    database: 'url_shortener',
    port: 5432,
});

// export default ki jagah module.exports use karo
module.exports = pool;