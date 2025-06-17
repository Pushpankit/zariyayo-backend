const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');
const Product = require('../models/Product');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Route to add product
router.post('/add-product', upload.array('images', 4), adminController.addProduct);


// Add after your upload/add-product routes
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // or your custom logic
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
