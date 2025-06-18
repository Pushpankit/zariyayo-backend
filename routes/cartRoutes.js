// server/routes/cartRoutes.js

const express = require("express");
const router = express.Router();

// Controller functions
const {
  addToCart,
  getCartItems,
  removeFromCart,
} = require("../controllers/cartController");

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Public (can later be secured)
router.post("/", addToCart);

// @route   GET /api/cart
// @desc    Get all cart items
// @access  Public
router.get("/", getCartItems);

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart by ID
// @access  Public
router.delete("/:id", removeFromCart);

module.exports = router;
