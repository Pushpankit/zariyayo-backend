// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// ✅ This becomes POST /api/orders
router.post('/orders', async (req, res) => {
  try {
    console.log('✅ Incoming order:', req.body); // Debug log
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error('❌ Failed to save order:', err);
    res.status(500).json({ message: 'Server error while saving order' });
  }
});

module.exports = router;
