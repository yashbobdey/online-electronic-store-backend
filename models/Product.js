const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    text: true,
  },
  price: {
    type: Number,
    required: [true, "Price of the product is requires"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    text: true,
  },
  description: {
    type: [String],
    text: true,
  },
  specification: Object,
  rating: Number,
  review: [Object],
  images: [String],
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
