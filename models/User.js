const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  cart: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: String,
      image: [String],
      selectedSize: String,
      quantity: Number,
      price: Number,
      stockBySize: mongoose.Schema.Types.Mixed,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
