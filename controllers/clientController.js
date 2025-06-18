// server/controllers/clientController.js

const Product = require('../models/Product');
const mongoose = require('mongoose');

// @desc    Get all products
// @route   GET /api/client/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    // Future-ready: filtering, sorting, pagination
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Get single product by ID
// @route   GET /api/client/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('❌ Error fetching product by ID:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
