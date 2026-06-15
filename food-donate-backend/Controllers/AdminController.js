const connection = require('../config/db');

// GET all users (admin only)
const getAllUsers = (req, res) => {
  const sql = 'SELECT id, name, email, role FROM users ORDER BY id DESC';
  connection.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// DELETE a user by id (admin only)
const deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({success: true,
       message: 'User deleted successfully' });
  });
};

module.exports = { getAllUsers, deleteUser };
