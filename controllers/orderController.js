const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.status(201).json({
    status: "success",
    data: orders,
  });
});
exports.getOrders = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const user_id = req.params.id;
  const orders = await Order.find({ owner: user_id });
  if (!orders) {
    return next({
      status: 400,
      message: "Order not found",
    });
  }
  res.status(201).json({
    orders,
  });
});

exports.addOrder = asyncHandler(async (req, res, next) => {
  // console.log(req.body);
  const { owner } = req.body;
  const order = await Order.create(req.body);
  const cart = await Cart.findOneAndUpdate(
    { owner },
    { items: [] },
    { new: true }
  );

  res.status(201).json({
    status: "succes",
    order,
  });
});
