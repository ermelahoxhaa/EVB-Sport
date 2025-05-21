const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/dbconfig');
const SECRET_KEY = 'sekret_i_sigurt'; 
const ROLES = require('../config/roles');
class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      db.execute(query, [email], async (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Database error' });
        }

        const user = result[0];
        if (!user) {
          return res.status(401).json({ success: false, message: 'Wrong email or password!' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(401).json({ success: false, message: 'Wrong email or password!' });
        }

        const token = jwt.sign(
          { email: user.email, id: user.id, role: user.role },
          SECRET_KEY,
          { expiresIn: '1h' }
        );

        return res.status(200).json({
          success: true,
          message: 'Successful login!',
          token,
          role: user.role
        });
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  static async signup(req, res) {
    const { email, password, name } = req.body;

    
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'All fields are required!' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = 'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)';
      db.execute(query, [email, hashedPassword, name, 'user'], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Database error' });
        }

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(201).json({
          success: true,
          message: 'User registered successfully!',
          token,
        });
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = AuthController;
