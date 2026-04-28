// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'cs208demo',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;

