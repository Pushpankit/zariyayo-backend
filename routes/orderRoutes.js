const express = require("express");
const { createOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder); // POST /api/orders

module.exports = router;
