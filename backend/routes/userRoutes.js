const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/dbConfig');
const AuthMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole(1),
  (req, res) => {
    const query = 'SELECT id, name, email, role FROM users_';
    db.execute(query, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(results);
    });
  }
);

router.post('/create-admin', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users_ (email, password, name, role) VALUES (?, ?, ?, 1)';
  db.execute(query, [email, hashedPassword, name], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(201).json({ message: 'Admin user created successfully!' });
  });
});

/*router.post('/create-admin', AuthMiddleware.authenticateToken, (req, res) => {
  const { email, password, name } = req.body;

  if (req.user.role !== 1) {
    return res.status(403).json({ message: 'Access denied. Only admins can create new admins.' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Password hashing failed' });
    }

    const query = 'INSERT INTO users_ (email, password, name, role) VALUES (?, ?, ?, 1)';
    db.execute(query, [email, hashedPassword, name], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      res.status(201).json({ message: 'Admin user created successfully!' });
    });
  });
});*/

module.exports = router;
