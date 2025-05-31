require('dotenv').config();
const auth = require('./routes/auth'); 
const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
console.log('User routes loaded');



const app = express();

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', auth);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('JWT_SECRET:', process.env.JWT_SECRET); 
});
