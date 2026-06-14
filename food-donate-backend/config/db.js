const mysql = require("mysql2");

const connection = mysql.createPool( process.env.MYSQL_URL);

connection.getConnection((err, conn) => {
  if (err) {
    console.log("Database Not connected");
    console.log(err);
  } else {
    console.log("Database connected Successfully");
    conn.release();
  }
});

module.exports = connection;

