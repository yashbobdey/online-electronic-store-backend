const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: {
    type: [Object],
    default: [],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total Price of the order is required"],
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
