const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const PORT = 3000;
const SECRET = 'sekret_i_sigurt';

app.use(cors());
app.use(bodyParser.json());


const loadUsers = () => {
  const data = fs.readFileSync('./users.json');
  return JSON.parse(data);
};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Wrong email or password!' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ success: false, message: 'Wrong email or password!' });
  }

  // Gjenerohet JWT token
  const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });

  return res.json({
    success: true,
    message: 'Successful login!',
    token
  });
});

app.listen(PORT, () => {
  console.log(`Serveri po dëgjon në http://localhost:${PORT}`);
});
