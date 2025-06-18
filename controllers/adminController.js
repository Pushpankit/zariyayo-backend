const Product = require("../models/Product");

// @desc    Create a product
exports.createProduct = async (req, res) => {
  try {
    const { title, category, pricesBySize, originalPricesBySize, description, sizes, stockBySize } = req.body;

    const images = req.files?.map(file => file.path);

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "Product images are required" });
    }

    const product = new Product({
      title,
      category,
      pricesBySize: JSON.parse(pricesBySize),
      originalPricesBySize: JSON.parse(originalPricesBySize),
      description,
      sizes: JSON.parse(sizes),
      stockBySize: JSON.parse(stockBySize),
      image: images,
    });

    const saved = await product.save();
    res.status(201).json({ message: "Product created", product: saved });

  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// @desc    Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updates = {
      ...req.body,
      pricesBySize: req.body.pricesBySize ? JSON.parse(req.body.pricesBySize) : undefined,
      originalPricesBySize: req.body.originalPricesBySize ? JSON.parse(req.body.originalPricesBySize) : undefined,
      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : undefined,
      stockBySize: req.body.stockBySize ? JSON.parse(req.body.stockBySize) : undefined,
    };

    if (req.files?.length > 0) {
      updates.image = req.files.map(file => file.path);
    }

    const updated = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated", product: updated });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// @desc    Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
