const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from Backend!');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
