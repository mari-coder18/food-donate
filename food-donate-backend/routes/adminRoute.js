const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../Controllers/AdminController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

// admin‑only
router.use(verifyToken, authorizeRole(['admin']));

// GET all users
router.get('/users', getAllUsers);

// DELETE a user by id
router.delete('/users/:id', deleteUser);

module.exports = router;
