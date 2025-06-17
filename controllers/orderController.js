const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { customerInfo, items, totalAmount } = req.body;

    const newOrder = new Order({
      customerInfo,
      items,
      totalAmount,
      paymentStatus: false,
      orderStatus: "pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to save order" });
  }
};

module.exports = { createOrder };
