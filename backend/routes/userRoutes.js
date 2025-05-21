const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/authMiddleware');
const db = require('../config/dbconfig');

router.post('/create-admin', AuthMiddleware.authenticateToken, (req, res) => {
  const { email, password, name } = req.body;

  if (req.user.role !== 'admin') {
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
