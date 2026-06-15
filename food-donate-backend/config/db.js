const mysql = require("mysql2/promise"); // 👈 Promise version-ah mathியாச்சு
require("dotenv").config();

// MySQL connection pool 
const connection = mysql.createPool({
  uri: process.env.MYSQL_URL,
  waitForConnections: true,
  connectionLimit: 10, // Default-ah safe pool limit
  queueLimit: 0
});

// Database connect 
(async () => {
  try {
    const conn = await connection.getConnection();
    console.log("🚀 Database connected successfully!");
    conn.release(); // Connection-ah pool-ku thirumba release panrom
  } catch (err) {
    console.log("❌ Database NOT connected ");
    console.error(err);
  }
})();


module.exports = connection;