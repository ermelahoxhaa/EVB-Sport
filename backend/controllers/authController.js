const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const [users] = await db.query('SELECT * FROM users_ WHERE email = ?', [email]);

      if (users.length === 0) {
        return res.status(401).json({ message: 'Incorrect email or password.' });
      }

      const user = users[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
      const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', 
      maxAge: 24 * 60 * 60 * 1000 
    });

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });

  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Error while processing the request.' });
  }
}

  static async signup(req, res) {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const [existingUser] = await db.query('SELECT * FROM users_ WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(409).json({ message: 'Email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        'INSERT INTO users_ (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, 0] 
      );
      res.status(201).json({ message: 'User was successfully registered.' });
    } catch (err) {
      console.error('Error during registration:', err.message);
      res.status(500).json({ message: 'Error while processing registration.' });
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      
      return res.json({ message: 'Logout successful' });
    } catch (err) {
      console.error('Error during logout:', err.message);
      res.status(500).json({ message: 'Error while processing logout.' });
    }
  }
}

module.exports = AuthController;
