// server/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    pricesBySize: {
      type: Map,
      of: Number,
      required: [true, "Prices by size are required"],
    },
    originalPricesBySize: {
      type: Map,
      of: Number,
      default: {},
    },
    image: {
      type: [String],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one product image is required",
      },
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    sizes: {
      type: [String],
      default: [],
    },
    stockBySize: {
      type: Map,
      of: Number,
      required: [true, "Stock by size is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Improve query performance for category + title
productSchema.index({ category: 1, title: 1 });

module.exports = mongoose.model("Product", productSchema);
