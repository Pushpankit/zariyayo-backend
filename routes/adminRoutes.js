const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");

// Setup multer to read file buffers (memory-based)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: Upload one file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        public_id: filename.split(".")[0],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // ✅ Return Cloudinary URL
      }
    );
    stream.end(fileBuffer);
  });
};

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

    console.log("🖼 Files received:", req.files.map(f => f.originalname));

    // ✅ Upload each image to Cloudinary
    const imageUrls = [];
    for (const file of req.files) {
      const url = await uploadToCloudinary(file.buffer, file.originalname);
      console.log("✅ Uploaded to Cloudinary:", url);
      imageUrls.push(url);
    }

    // ✅ Save to DB with Cloudinary URLs
    const newProduct = new Product({
      title,
      category,
      description,
      sizes: JSON.parse(sizes),
      pricesBySize: JSON.parse(pricesBySize),
      originalPricesBySize: JSON.parse(originalPricesBySize),
      stockBySize: JSON.parse(stockBySize),
      image: imageUrls, // 🟢 Save secure Cloudinary URLs
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "✅ Product added!",
      product: newProduct,
    });
  } catch (err) {
    console.error("❌ Error in /add-product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
