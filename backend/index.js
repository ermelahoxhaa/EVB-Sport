require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');



const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('JWT_SECRET:', process.env.JWT_SECRET); 
});
