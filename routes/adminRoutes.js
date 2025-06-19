const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product"); // adjust if needed

// multer setup
const storage = multer.memoryStorage(); // or use disk/cloudinary
const upload = multer({ storage });

// @route POST /api/admin/add-product
router.post("/add-product", upload.array("images", 4), async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      sizes,
      pricesBySize,
      originalPricesBySize,
      stockBySize,
    } = req.body;

    const images = req.files.map(file => {
      // if using Cloudinary or similar, upload and store URL
      return `uploads/${file.originalname}`; // temp placeholder
    });

    const newProduct = new Product({
      title,
      category,
      description,
      sizes: JSON.parse(sizes),
      pricesBySize: JSON.parse(pricesBySize),
      originalPricesBySize: JSON.parse(originalPricesBySize),
      stockBySize: JSON.parse(stockBySize),
      image: images,
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product added!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
