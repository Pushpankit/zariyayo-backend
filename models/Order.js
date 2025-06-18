const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: {
      type: String,
      required: [true, "Customer name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"]
    },
    address: {
      type: String,
      required: [true, "Delivery address is required"]
    },
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      title: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: Boolean,
    default: false
  },
  paymentId: {
    type: String,
    default: null
  },
  orderStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"]
  },
}, { timestamps: true }); // includes createdAt and updatedAt

module.exports = mongoose.model("Order", orderSchema);
