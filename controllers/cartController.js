let cartDB = []; // In-memory mock database

exports.addToCart = (req, res) => {
  const item = req.body;
  console.log("Incoming item:", item); // ✅ DEBUGGING LINE

  if (
    !item ||
    !item.id ||
    !item.title ||
    !item.price ||
    !item.selectedSize ||
    !item.quantity
  ) {
    return res.status(400).json({ error: "Invalid item data" });
  }

  cartDB.push(item);
  res.status(201).json({ message: "Item added to cart", item });
};

exports.getCartItems = (req, res) => {
  res.json(cartDB);
};

exports.removeFromCart = (req, res) => {
  const id = req.params.id;
  const prevLength = cartDB.length;
  cartDB = cartDB.filter((item) => item.id !== id);
  if (cartDB.length === prevLength) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json({ message: "Item removed from cart" });
};
