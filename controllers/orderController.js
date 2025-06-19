// controllers/orderController.js
const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ error: 'Failed to save order' });
  }
};

module.exports = { createOrder };
