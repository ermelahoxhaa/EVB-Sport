const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/authMiddleware');
const db = require('../config/dbConfig'); 
const ROLES = require('../config/roles');

router.get('/', AuthMiddleware.authenticateToken, AuthMiddleware.authorizeRole('admin'), (req, res) => {
  const query = 'SELECT id, name, email, role FROM users'; 
  db.execute(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
});

router.post('/create-admin', AuthMiddleware.authenticateToken, (req, res) => {
  const { email, password, name } = req.body;

  if (req.user.role !== ROLES.ADMIN) {
    return res.status(403).json({ message: 'Access denied. Only admins can create new admins.' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Password hashing failed' });
    }

    const query = 'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)';
    db.execute(query, [email, hashedPassword, name, 'admin'], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      res.status(201).json({ message: 'Admin user created successfully!' });
    });
  });
});

module.exports = router;
