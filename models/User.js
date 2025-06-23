const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: String,
      image: [String],
      selectedSize: String,
      quantity: { type: Number, default: 1 },
      price: Number,
      stockBySize: mongoose.Schema.Types.Mixed,
    },
  ],

  // Optional for admin dashboard or role-based access
  // role: { type: String, enum: ["user", "admin"], default: "user" },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
