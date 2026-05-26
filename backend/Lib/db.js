import { Pool } from 'pg';

const pool = new Pool({
    user: 'khushisingh',
    host: 'localhost',
    database: 'url_shortener',
    port: 5432,
});

export default pool;