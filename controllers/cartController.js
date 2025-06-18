// server/controllers/cartController.js

let cartDB = []; // ⚠️ In-memory mock database (resets on server restart)

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
exports.addToCart = (req, res) => {
  const { id, title, price, selectedSize, quantity } = req.body;

  // Basic validation
  if (!id || !title || !price || !selectedSize || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const item = { id, title, price, selectedSize, quantity };

  cartDB.push(item);

  console.log("🛒 Item added:", item);
  res.status(201).json({ message: "Item added to cart", item });
};

// @desc    Get all items in cart
// @route   GET /api/cart
// @access  Public
exports.getCartItems = (req, res) => {
  res.status(200).json(cartDB);
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
exports.removeFromCart = (req, res) => {
  const { id } = req.params;

  const initialLength = cartDB.length;
  cartDB = cartDB.filter((item) => item.id !== id);

  if (cartDB.length === initialLength) {
    return res.status(404).json({ error: "Item not found in cart" });
  }

  res.status(200).json({ message: "Item removed from cart" });
};
