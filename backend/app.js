// Backend per pjesen e login
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(cors());
app.use(bodyParser.json());


const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Login i suksesshëm' });
  } else {
    res.status(401).json({ message: 'Përdoruesi ose fjalëkalimi janë të pasakta' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveri është duke funksionuar në http://localhost:${PORT}`);
});
