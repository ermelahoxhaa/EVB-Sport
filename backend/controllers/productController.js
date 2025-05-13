const db = require('../config/dbConfig');

// Merrni të gjithë produktet
exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching products' });
    res.json(result);
  });
};

// Merrni një produkt me ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching product' });
    res.json(result[0]);
  });
};

// Shtoni një produkt
exports.createProduct = (req, res) => {
  const { name, price, brand } = req.body;
  const image = req.file ? req.file.filename : null;

  const query = 'INSERT INTO products (name, price, brand, image) VALUES (?, ?, ?, ?)';
  db.query(query, [name, price, brand, image], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error creating product' });
    res.status(201).json({ message: 'Product created successfully' });
  });
};

// Përdorim për përditësimin e produktit
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, brand } = req.body;
  const image = req.file ? req.file.filename : null;
  const db = require('../config/dbConfig');

  // Get all products
  exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ message: 'Error fetching products' });
      }
      res.json(result);
    });
  };
  
  // Get product by ID
  exports.getProductById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ message: 'Error fetching product' });
      }
      res.json(result[0]);
    });
  };
  
  // Create a new product
  exports.createProduct = (req, res) => {
    const { name, price, brand } = req.body;
    const image = req.file ? req.file.filename : null;
    
    db.query('INSERT INTO products (name, price, brand, image) VALUES (?, ?, ?, ?)', 
      [name, price, brand, image], 
      (err, result) => {
        if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ message: 'Error creating product' });
        }
        res.status(201).json({ id: result.insertId, name, price, brand, image });
      });
  };
  
  // Update product
  exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, brand } = req.body;
    const image = req.file ? req.file.filename : null;
  
    db.query('UPDATE products SET name = ?, price = ?, brand = ?, image = ? WHERE id = ?', 
      [name, price, brand, image, id], 
      (err, result) => {
        if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ message: 'Error updating product' });
        }
        res.json({ id, name, price, brand, image });
      });
  };
  
  // Delete product
  exports.deleteProduct = (req, res) => {
    const { id } = req.params;
  
    db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ message: 'Error deleting product' });
      }
      res.status(204).send();
    });
  };
  
  const query = 'UPDATE products SET name = ?, price = ?, brand = ?, image = ? WHERE id = ?';
  db.query(query, [name, price, brand, image, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating product' });
    res.json({ message: 'Product updated successfully' });
  });
};

// Përdorim për fshirjen e produktit
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting product' });
    res.json({ message: 'Product deleted successfully' });
  });
};
