import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Use a promise-based pool for async/await queries
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional: test a connection on startup (non-blocking)
(async () => {
  try {
    const conn = await pool.getConnection();
    conn.release();
    console.log('Connected to MySQL (pool)');
  } catch (err) {
    console.error('DB pool connection error:', err);
  }
})();

export default pool;
