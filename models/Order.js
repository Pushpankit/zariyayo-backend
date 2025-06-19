const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    notes: String,
  },
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      title: String,
      size: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  shippingCost: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
