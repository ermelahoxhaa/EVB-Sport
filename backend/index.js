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

const saveUsers = (users) => {
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
};

app.post('/api/auth/login', async (req, res) => {

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

  const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });

  return res.json({
    success: true,
    message: 'Successful login!',
    token
  });
});

app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;

  const users = loadUsers();

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ success: false, message: 'Email already exists!' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { email, password: hashedPassword, name };

  users.push(newUser);

  saveUsers(users);

  const token = jwt.sign({ email: newUser.email }, SECRET, { expiresIn: '1h' });

  return res.json({
    success: true,
    message: 'User registered successfully!',
    token
  });
});

app.get('/api/users', (req, res) => {
  const users = loadUsers();
  return res.json(users);
});

app.put('/api/users/:email', async (req, res) => {
  const { email } = req.params;
  const { name, password } = req.body;
  const users = loadUsers();

  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found!' });
  }

  if (password) {
    users[userIndex].password = await bcrypt.hash(password, 10);
  }
  if (name) {
    users[userIndex].name = name;
  }

  saveUsers(users);

  return res.json({
    success: true,
    message: 'User updated successfully!'
  });
});

app.delete('/api/users/:email', (req, res) => {
  const { email } = req.params;
  const users = loadUsers();

  const updatedUsers = users.filter(u => u.email !== email);

  if (users.length === updatedUsers.length) {
    return res.status(404).json({ success: false, message: 'User not found!' });
  }

  saveUsers(updatedUsers);

  return res.json({
    success: true,
    message: 'User deleted successfully!'
  });
});

app.listen(PORT, () => {
  console.log(`The server is listening on http://localhost:${PORT}`);
});
