const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // ✅ MATCHES your file name

router.post('/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error('❌ Order save error:', err);
    res.status(500).json({ message: 'Server error while saving order' });
  }
});

module.exports = router;
