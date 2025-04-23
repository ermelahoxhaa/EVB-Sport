const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sekret_i_sigurt';

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
}

module.exports = AuthMiddleware;
