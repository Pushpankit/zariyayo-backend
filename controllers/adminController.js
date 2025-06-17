const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      sizes,
      pricesBySize,
      originalPricesBySize,
      stockBySize
    } = req.body;

    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

    const product = new Product({
      title,
      category,
      description,
      sizes: JSON.parse(sizes),
      pricesBySize: JSON.parse(pricesBySize),
      originalPricesBySize: JSON.parse(originalPricesBySize),
      stockBySize: JSON.parse(stockBySize),
      image: imagePaths
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Failed to add product' });
  }
};
