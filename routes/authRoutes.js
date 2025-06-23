const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Order = require("../models/Order");

// @route    POST /api/auth/register
// @desc     Register user
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this phone number" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route    POST /api/auth/login
// @desc     Login user
// server/routes/auth.js
router.post("/login", async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  try {
    const user = await User.findOne({ email, phone, fullName });
    if (!user) {
      return res.status(404).json({ message: "User not found. Check your details." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// @route    GET /api/auth/:userId/orders
// @desc     Get user order history
router.get("/:userId/orders", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ "customerInfo._id": userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Order fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/profile/:phone", async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    const orders = await Order.find({ "customerInfo.phone": req.params.phone });
    res.json({ user, orders });
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
