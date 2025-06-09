const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/dbConfig');
const AuthMiddleware = require('../middleware/authMiddleware');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get(
  '/',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole(1),
  async (req, res) => {
    try {
      // Check if filtering by role
      if (req.query.role !== undefined) {
        return UserController.getUsersByRole(req, res);
      }
      return UserController.getAllUsers(req, res);
    } catch (err) {
      res.status(500).json({ message: 'Database error' });
    }
  }
);

// endpointi per me kriju admin, role duhet te jete 1 vetem admin mund te krijoj admin te ri
router.post('/create-admin', 
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole(1),
  async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const [existing] = await db.execute('SELECT * FROM users_ WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(409).json({ message: 'Email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.execute('INSERT INTO users_ (email, password, name, role) VALUES (?, ?, ?, 1)', [email, hashedPassword, name]);
      
      res.status(201).json({ message: 'Admin user created successfully!' });
    } catch (err) {
      console.error('Error creating admin:', err.message);
      res.status(500).json({ message: 'Database error' });
    }
  }
);

router.get('/check', AuthMiddleware.authenticateToken, (req, res) => {
  const { id, role } = req.user;
  res.json({ userId: id, role: role === 1 ? 'admin' : 'user' });
});

// modifikimi i userit (vetem admin mund te modifikoj userat)
router.put('/:id', 
  AuthMiddleware.authenticateToken, 
  AuthMiddleware.authorizeRole(1),
  UserController.updateUser
);

// delete user (vetem admin mund te fshij userat)
router.delete('/:id', 
  AuthMiddleware.authenticateToken, 
  AuthMiddleware.authorizeRole(1),
  UserController.deleteUser
);

module.exports = router;

module.exports = router;
