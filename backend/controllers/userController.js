const db = require('../config/dbConfig');
const bcrypt = require('bcryptjs');
const ROLES = require('../config/roles');

class UserController {
  static async getAllAdmins(req, res) {
    try {
      const [admins] = await db.query(
        `SELECT u.id, u.username, u.email, ur.role
         FROM users u
         JOIN user_roles ur ON u.id = ur.user_id
         WHERE ur.role = ?`,
        [ROLES.ADMIN]
      );
      res.json(admins);
    } catch (err) {
      console.error('Fetch admins error:', err);
      res.status(500).json({ message: 'Gabim në server.' });
    }
  }

  static async createAdmin(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme.' });
    }

    try {
      const [existing] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
      if (existing.length > 0) {
        return res.status(409).json({ message: 'Username ose email ekziston.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );

      const userId = result.insertId;

      await db.query('INSERT INTO user_roles (user_id, role) VALUES (?, ?)', [userId, ROLES.ADMIN]);

      res.status(201).json({ message: 'Admin u krijua me sukses.' });
    } catch (err) {
      console.error('Create admin error:', err);
      res.status(500).json({ message: 'Gabim në server.' });
    }
  }

  static async updateAdmin(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    try {
      // Kontrollo nëse email ekziston për user tjetër (jo për vetveten)
      const [existing] = await db.query(
        'SELECT * FROM users WHERE email = ? AND id != ?',
        [email, id]
      );
      if (existing.length > 0) {
        return res.status(409).json({ message: 'Email already in use by another user' });
      }

      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Ndrysho të dhënat e user-it
      if (hashedPassword) {
        await db.query(
          'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
          [name, email, hashedPassword, id]
        );
      } else {
        await db.query(
          'UPDATE users SET name = ?, email = ? WHERE id = ?',
          [name, email, id]
        );
      }

      res.json({ message: 'Admin updated successfully' });
    } catch (err) {
      console.error('Update admin error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  static async deleteAdmin(req, res) {
  const { id } = req.params;

  try {
    // Fshi admin dhe rolin e tij
    await db.query('DELETE FROM user_roles WHERE user_id = ?', [id]);
    await db.query('DELETE FROM users WHERE id = ?', [id]);

    res.json({ message: 'Admin deleted successfully' });
  } catch (err) {
    console.error('Delete admin error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

}

module.exports = UserController;
