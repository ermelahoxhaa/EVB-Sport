const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  const products = await Product.getAll();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.getById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
};

exports.createProduct = async (req, res) => {
  const { name, price, brand } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const id = await Product.create({ name, price, image, brand });
  await Product.logAdminAction('insert', id);
  res.status(201).json({ message: 'Product created', id });
};

exports.updateProduct = async (req, res) => {
  const { name, price, brand } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.existingImage;
  await Product.update(req.params.id, { name, price, image, brand });
  await Product.logAdminAction('update', req.params.id);
  res.json({ message: 'Product updated' });
};

exports.deleteProduct = async (req, res) => {
  await Product.delete(req.params.id);
  res.json({ message: 'Product deleted' });
};

exports.getModifications = async (req, res) => {
  const logs = await Product.getModifications();
  res.json(logs);
};
