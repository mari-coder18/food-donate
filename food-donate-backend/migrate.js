const mysql = require('mysql2/promise');
require('dotenv').config();
(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  try {
    // Check if donor_id column exists
    const [rows] = await connection.query(`SHOW COLUMNS FROM donations LIKE 'donor_id'`);
    if (rows.length === 0) {
      console.log('Adding donor_id column...');
      await connection.query('ALTER TABLE donations ADD COLUMN donor_id INT DEFAULT NULL');
      console.log('donor_id column added.');
    } else {
      console.log('donor_id column already exists.');
    }
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await connection.end();
  }
})();
