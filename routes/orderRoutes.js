// server/routes/orderRoutes.js

const express = require("express");
const router = express.Router();

// Controller
const { createOrder } = require("../controllers/orderController");

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public (can secure later with auth)
router.post("/", createOrder);

module.exports = router;
