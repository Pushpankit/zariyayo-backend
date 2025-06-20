const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");

// Setup multer for memory-based uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload helper
const uploadToCloudinary = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        public_id: filename.split(".")[0],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// ✅ Final POST /api/admin/products
router.post("/products", upload.array("images", 4), async (req, res) => {
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

    console.log("🖼 Images received:", req.files.map(f => f.originalname));

    // Upload images to Cloudinary
    const imageUrls = [];
    for (const file of req.files) {
      const url = await uploadToCloudinary(file.buffer, file.originalname);
      console.log("✅ Uploaded:", url);
      imageUrls.push(url);
    }

    // Save product in DB
    const newProduct = new Product({
      title,
      category,
      description,
      sizes: JSON.parse(sizes),
      pricesBySize: JSON.parse(pricesBySize),
      originalPricesBySize: JSON.parse(originalPricesBySize),
      stockBySize: JSON.parse(stockBySize),
      image: imageUrls,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "✅ Product added",
      product: newProduct,
      imageUrls, // helpful for frontend preview/debug
    });
  } catch (err) {
    console.error("❌ Error in POST /products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
