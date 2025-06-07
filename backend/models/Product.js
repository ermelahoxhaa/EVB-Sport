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
  const [rows] = await db.query(`
    SELECT 
      p.id,
      p.name,
      d.price,
      d.image,
      d.brand,
      d.stock,
      d.modified_at
    FROM products p
    JOIN product_details d ON p.id = d.product_id
  `);
  return rows;
}

  static async getById(id) {
  const [rows] = await db.query(`
    SELECT 
      p.id,
      p.name,
      d.price,
      d.image,
      d.brand,
      d.stock,
      d.modified_at
    FROM products p
    JOIN product_details d ON p.id = d.product_id
    WHERE p.id = ?
  `, [id]);
  return rows[0];
}


  static async create({ name, price, brand, stock, image}) {
  const [productResult] = await db.query(
    'INSERT INTO products (name) VALUES (?)',
    [name]
  );

  const productId = productResult.insertId;

  await db.query(
    `INSERT INTO product_details (product_id, price, image, brand, stock, modified_at)
     VALUES (?, ?, ?, ?, NOW())`,
    [productId, price, image, brand, stock]
  );

  return productId;
}


  static async update(id, { name, price, brand, image, stock }) {
  await db.query(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id]
  );

  await db.query(
    `UPDATE product_details SET price = ?, image = ?, brand = ?, stock = ?, modified_at = NOW()
     WHERE product_id = ?`,
    [price, image, brand, stock, id]
  );

  return true;
}


 static async delete(id) {
  await db.query('DELETE FROM product_details WHERE product_id = ?', [id]);
  await db.query('DELETE FROM products WHERE id = ?', [id]);
  return true;
}
}

module.exports = Product;
