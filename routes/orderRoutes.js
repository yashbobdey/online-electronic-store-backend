const express = require("express");
const orderController = require(`../controllers/orderController`);
const protect = require("../middlewares/protect");
const router = express.Router();

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(protect, orderController.addOrder);
router.route("/:id").get(protect, orderController.getOrders);

module.exports = router;
