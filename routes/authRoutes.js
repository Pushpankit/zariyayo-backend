const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateUserCart,
  getUserByPhoneOrEmail,
} = require("../controllers/authController");

// 🔐 Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/update-cart", updateUserCart);
router.get("/get-user", getUserByPhoneOrEmail);

module.exports = router;
