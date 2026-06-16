const mysql = require("mysql2/promise");
require("dotenv").config();


const databaseUri = process.env.MYSQL_URL || "mysql://root:getpjscqMxVlkQlArLsDovyiIFVtZjED@thomas.proxy.rlwy.net:14544/railway";

//  MySQL connection 
const db = mysql.createPool({
  uri: databaseUri, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false 
  }
});

// Immediately invoked validation loop to confirm handshake success
(async () => {
  try {
    const checkConnection = await db.getConnection();
    console.log("🚀 Database connected successfully to Railway Cloud Proxy!");
    checkConnection.release(); // Releases client resource instance context loop pointer back to connection pool
  } catch (error) {
    console.error("❌ Database initialization error!");
    console.error(error.message);
  }
})();

module.exports = db;