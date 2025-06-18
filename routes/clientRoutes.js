// server/routes/clientRoutes.js

const express = require('express');
const router = express.Router();

// Controller imports
const {
  getAllProducts,
  getProductById,
} = require('../controllers/clientController');

// @route   GET /api/client/products
// @desc    Get all products
// @access  Public
router.get('/products', getAllProducts);

// @route   GET /api/client/products/:id
// @desc    Get a product by ID
// @access  Public
router.get('/products/:id', getProductById);

module.exports = router;
