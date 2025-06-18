// server/controllers/orderController.js

const Order = require("../models/Order");

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { customerInfo, items, totalAmount } = req.body;

    // Basic validation
    if (!customerInfo || !items || !Array.isArray(items) || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({
      customerInfo,
      items,
      totalAmount,
      paymentStatus: false,     // By default unpaid
      orderStatus: "pending",   // Default status
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("❌ Error saving order:", error.message);
    res.status(500).json({ message: "Failed to save order" });
  }
};

module.exports = { createOrder };
