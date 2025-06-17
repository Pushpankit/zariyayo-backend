const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      title: String,
      size: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  paymentId: {
    type: String,
    default: null,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
