const express = require("express");
const router = express.Router();
const upload = require("../utils/multer"); // For Cloudinary image upload
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminController");

// @route   POST /api/admin/products
// @desc    Add a new product
// @access  Admin
router.post("/products", upload.array("images", 4), createProduct);

// @route   PUT /api/admin/products/:id
// @desc    Update an existing product
// @access  Admin
router.put("/products/:id", upload.array("images", 4), updateProduct);

// @route   DELETE /api/admin/products/:id
// @desc    Delete a product
// @access  Admin
router.delete("/products/:id", deleteProduct);

module.exports = router;
