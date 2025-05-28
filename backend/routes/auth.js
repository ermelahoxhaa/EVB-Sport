const express = require('express');
const AuthController = require('../controllers/authController');
const AuthMiddleware = require('../middleware/authMiddleware');
const ROLES = require('../config/roles');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);

router.get('/protected', AuthMiddleware.authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route!' });
});

router.get('/admin-only', 
  AuthMiddleware.authenticateToken, 
  AuthMiddleware.authorizeRole(ROLES.ADMIN), 
  (req, res) => {
    res.json({ message: 'Welcome admin!' });
});

module.exports = router;
