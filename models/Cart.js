const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: {
    type: [Object],
    default: [],
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
