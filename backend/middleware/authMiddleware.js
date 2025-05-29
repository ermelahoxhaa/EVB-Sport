const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const ROLES = require('../config/roles');
class AuthMiddleware {
  static authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(403).json({ success: false, message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ success: false, message: 'Invalid token.' });
      }
      
      req.user = decoded;
      next();
    });
  }
  static authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ success: false, message: 'Access denied: insufficient privileges.' });
    }
    next();
  };
}

}

module.exports = AuthMiddleware;
