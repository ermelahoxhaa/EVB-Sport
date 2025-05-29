const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const db = require('../config/dbConfig');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = process.env.JWT_SECRET; 


const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login i suksesshëm',
      token: token
    });
  } else {
    res.status(401).json({ message: 'Përdoruesi ose fjalëkalimi janë të pasakta' });
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(403).json({ message: 'Token mungon' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: 'Token i pavlefshëm' });
    req.user = user;
    next();
  });
}
app.use('/images', express.static(path.join(__dirname, '../images')));
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
app.get('/api/products', (req, res) => {
  console.log('Request për /api/products ka mbërritur!'); 

  const query = 'SELECT * FROM products';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Gabim gjatë leximit të produkteve:', err);
      return res.status(500).json({ error: 'Gabim në server' });
    }

    console.log('Produkte u gjetën:', results);
    res.json(results);
  });
});


app.get('/sekret', verifyToken, (req, res) => {
  res.json({ message: `Përshëndetje ${req.user.username}, ky është një mesazh sekret 🔐` });
});

const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveri është duke funksionuar në http://localhost:${PORT}`);
});
