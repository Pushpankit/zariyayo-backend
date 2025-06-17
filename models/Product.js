const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  pricesBySize: { type: Map, of: Number },
  originalPricesBySize: { type: Map, of: Number },
  image: [String],
  description: String,
  sizes: [String],
  stockBySize: { type: Map, of: Number }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
