const express = require("express");
const cartController = require(`../controllers/cartController.js`);
const protect = require("./../middlewares/protect");

const router = express.Router(); //middleware

router
  .route("/:id")
  .get(cartController.getCart)
  .put(protect, cartController.removeFromCart)
  .post(protect, cartController.addToCart);

router
  .route("/decreaseQuantity/:id")
  .post(protect, cartController.decreaseQuantity);
router
  .route("/increaseQuantity/:id")
  .post(protect, cartController.increaseQuantity);

module.exports = router;
