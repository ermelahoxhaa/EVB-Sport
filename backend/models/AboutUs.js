const db = require('../config/dbConfig');

class AboutUs {
  static async get() {
    const [rows] = await db.query('SELECT id, description FROM about_us LIMIT 1');
    return rows[0];
  }

  static async update(id, description) {
    await db.query('UPDATE about_us SET description = ? WHERE id = ?', [description, id]);
    return true;
  }
}

module.exports = AboutUs;