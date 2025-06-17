// server/routes/clientRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // ✅ fixed import path

// -----------------------------------------------------------------------------
// @desc    Get all products (public)
// @route   GET /api/products
// -----------------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching all products:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// -----------------------------------------------------------------------------
// @desc    Get single product by ID (public)
// @route   GET /api/products/:id
// -----------------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = router;
