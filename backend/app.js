const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const db = require('../config/dbConfig');

const authRoutes = require('./routes/auth');       
const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes'); 

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);        
app.use('/api/users', userRoutes);       
app.use('/api/products', productRoutes); 

app.get('/api', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Gabim gjatë leximit të produkteve:', err);
      return res.status(500).json({ error: 'Gabim në server' });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveri është duke funksionuar në http://localhost:${PORT}`);
});
