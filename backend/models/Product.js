const db = require('../config/dbConfig');

class Product {
  constructor(id, name, price, image, brand) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.brand = brand;
  }

  static async getAll() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ name, price, image, brand }) {
    const [result] = await db.query(
      'INSERT INTO products (name, price, image, brand, modified_at) VALUES (?, ?, ?, ?, NOW())',
      [name, price, image, brand]
    );
    return result.insertId;
  }

  static async update(id, { name, price, image, brand }) {
    await db.query(
      'UPDATE products SET name = ?, price = ?, image = ?, brand = ?, modified_at = NOW() WHERE id = ?',
      [name, price, image, brand, id]
    );
    return true;
  }

  static async delete(id) {
    await db.query('DELETE FROM admin_actions WHERE product_id = ?', [id]);
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    return true;
  }

  static async logAdminAction(action, product_id) {
    await db.query(
      'INSERT INTO admin_actions (product_id, action, action_time) VALUES (?, ?, NOW())',
      [product_id, action]
    );
  }

  static async getModifications() {
    const [rows] = await db.query(`
      SELECT p.name AS product_name, aa.action, aa.action_time
      FROM admin_actions aa
      JOIN products p ON aa.product_id = p.id
      ORDER BY aa.action_time DESC
    `);
    return rows;
  }
}

module.exports = Product;
