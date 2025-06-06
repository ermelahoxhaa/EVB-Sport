const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

router.post('/', async (req, res) => {
  const { product_id, user_name, email, phone, address } = req.body;
  try {
    await db.query(
      'INSERT INTO orders (product_id, user_name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
      [product_id, user_name, email, phone, address]
    );
    res.status(200).send({ message: 'Order placed' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.*, p.name AS product_name
      FROM orders o
      JOIN products p ON o.product_id = p.id
    `);
    res.send(orders);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put('/:id/delivered', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE orders SET status = 'delivered' WHERE id = ?", [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM orders WHERE id = ?", [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
