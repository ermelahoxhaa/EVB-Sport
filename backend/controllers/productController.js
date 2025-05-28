const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, brand } = req.body;
    const image = req.file ? req.file.filename : null;

    const id = await Product.create({ name, price, brand, image });
    const newProduct = await Product.getById(id);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, brand, existingImage } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    await Product.update(id, { name, price, brand, image });
    const updatedProduct = await Product.getById(id);
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.delete(id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Database error' });
  }
};
