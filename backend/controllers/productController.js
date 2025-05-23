const fs = require('fs');
const path = require('path');

let products = [];

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.createProduct = (req, res) => {
  const { name, price, brand } = req.body;
  const image = req.file ? req.file.filename : null;

  const newProduct = {
    id: Date.now(),
    name,
    price,
    brand,
    image,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, brand } = req.body;
  const image = req.file ? req.file.filename : null;

  const index = products.findIndex((p) => p.id == id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const updated = { ...products[index], name, price, brand };
  if (image) updated.image = image;

  products[index] = updated;
  res.json(updated);
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id == id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
};
