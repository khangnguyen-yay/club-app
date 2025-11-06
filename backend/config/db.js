const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createConnection({
  host: 'localhost', // or 'mysql' if using Docker network name
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

pool.connect(err => {
  if (err) console.error('DB connection error:', err);
  else console.log('Connected to MySQL!');
});

module.exports = connection;
