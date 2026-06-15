
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createPool(process.env.MYSQL_URL);

connection.getConnection((err, conn) => {
  if (err) {
    console.log("Database NOT connected ❌");
    console.log(err);
  } else {
    console.log("Database connected successfully 🚀");
    conn.release();
  }
});

module.exports = connection;

