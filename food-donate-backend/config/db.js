const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

(async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Database connected successfully 🚀");
  } catch (err) {
    console.log("Database NOT connected ❌");
    console.log("Error:", err.message);
  } finally {
    if (conn) conn.release();
  }
})();

module.exports = pool;