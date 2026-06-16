const connection = require('../config/db');

// GET all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const sql = 'SELECT id, name, email, role,status FROM users ORDER BY id DESC';
    
    
    const [rows] = await connection.query(sql);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// DELETE a user by id (admin only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    
    // [result] array destructuring pattern
    const [result] = await connection.query(sql, [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = { getAllUsers, deleteUser };