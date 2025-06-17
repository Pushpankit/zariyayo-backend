const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeFromCart,
} = require("../controllers/cartController");

// ✅ No requireAuth (since no login)
router.post("/", addToCart);
router.get("/", getCartItems);
router.delete("/:id", removeFromCart);

module.exports = router; // ✅ VERY IMPORTANT
