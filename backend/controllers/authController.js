const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig'); 
const ROLES = require('../config/roles');

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const [users] = await db.query('SELECT * FROM users_ WHERE email = ?', [email]);

      if (users.length === 0) {
        return res.status(401).json({ message: 'Incorrect email or password.' });
      }

      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect email or password.' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role || 'user' }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
      res.json({ token, role: user.role || 'user' });
    } catch (err) {
      console.error('Error during login:', err.message);
      res.status(500).json({ message: 'Error while processing the request.' });
    }
  };

  static async signup(req, res) {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const [existingUser] = await db.query('SELECT * FROM users_ WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(409).json({ message: 'Email exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query('INSERT INTO users_ (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
      res.status(201).json({ message: 'User was successfully registered.' });
    } catch (err) {
      console.error('Error during registration:', err.message);
      res.status(500).json({ message: 'Error while processing registration.' });
    }
  }
}

module.exports = AuthController;
