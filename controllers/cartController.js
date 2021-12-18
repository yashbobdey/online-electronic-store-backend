const User = require("../models/User.js");
const Cart = require("../models/Cart.js");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

//************************************************************
//-------------------- Get Cart ------------------------------
//____________________________________________________________

exports.getCart = asyncHandler(async (req, res, next) => {
  const user_id = req.params.id;
  const cart = await Cart.findOne({ owner: user_id });
  if (!cart) {
    return next(new AppError("cart not found", 400));
    // {
    //   status: 400,
    //   message: "cart not found",
    // }
  }
  const cartItems = cart.items;
  const totalPrice = cartItems.reduce(function (acc, item) {
    return acc + item.price * item.quantity;
  }, 0);

  res.status(201).json({
    items: cart.items,
    length: cart.items.length,
    totalPrice,
  });
});

//************************************************************
//-------------------- Add To Cart ---------------------------
//____________________________________________________________

exports.addToCart = asyncHandler(async (req, res, next) => {
  const user_id = req.params.id;
  let product = req.body.product;

  const cart = await Cart.findOne({ owner: user_id });

  let cartItems = cart.items;

  for (const item of cartItems) {
    if (item._id === product._id) {
      return next(new AppError("Item is already present in the cart!", 400));
      // {
      //   status: 400,
      //   message: "Item is already present in the cart!",
      // }
    }
  }

  let newItems = [...cartItems, product];

  const updatedCart = await Cart.findOneAndUpdate(
    { owner: user_id },
    { items: newItems },
    { new: true }
  );
  const updatedCartItems = updatedCart.items;
  const totalPrice = updatedCartItems.reduce(function (acc, item) {
    return acc + item.price * item.quantity;
  }, 0);
  console.log("Inside add to cart:", totalPrice);
  res.status(201).json({
    status: "success!",
    items: updatedCartItems,
    length: updatedCartItems.length,
    totalPrice,
  });
});

//************************************************************
//-------------------- Remove From Cart ----------------------
//____________________________________________________________

exports.removeFromCart = asyncHandler(async (req, res, next) => {
  const user_id = req.params.id;
  let product = req.body.product;

  const cart = await Cart.findOne({ owner: user_id });
  let cartItems = cart.items;

  const filteredCartItems = cartItems.filter(function (item) {
    return item._id !== product._id;
  });

  const updatedCart = await Cart.findOneAndUpdate(
    { owner: req.params.id },
    { items: filteredCartItems },
    { new: true }
  );

  const updatedCartItems = updatedCart.items;
  const totalPrice = updatedCartItems.reduce(function (acc, item) {
    return acc + item.price * item.quantity;
  }, 0);

  res.status(201).json({
    status: "success",
    items: updatedCartItems,
    length: updatedCartItems.length,
    totalPrice,
  });
});

//************************************************************
//-------------------- Increase Quantity ---------------------
//____________________________________________________________

exports.increaseQuantity = asyncHandler(async (req, res, next) => {
  const user_id = req.params.id;
  let product = req.body.product;

  const cart = await Cart.findOne({ owner: user_id });
  let cartItems = cart.items;

  const newItems = cartItems.map((el) => {
    if (el._id === product._id) {
      el.quantity += 1;
    }
    return el;
  });

  const updatedCart = await Cart.findOneAndUpdate(
    { owner: req.params.id },
    { items: newItems },
    { new: true }
  );

  const updatedCartItems = updatedCart.items;
  const totalPrice = updatedCartItems.reduce(function (acc, item) {
    return acc + item.price * item.quantity;
  }, 0);

  res.status(201).json({
    status: "success",
    items: updatedCartItems,
    length: updatedCartItems.length,
    totalPrice,
  });
});
//************************************************************
//-------------------- Decrease Quantity ---------------------
//____________________________________________________________

exports.decreaseQuantity = asyncHandler(async (req, res, next) => {
  const user_id = req.params.id;
  let product = req.body.product;

  const cart = await Cart.findOne({ owner: user_id });
  let cartItems = cart.items;

  const newItems = cartItems.map((el) => {
    if (el._id === product._id) {
      el.quantity -= 1;
    }
    return el;
  });

  const updatedCart = await Cart.findOneAndUpdate(
    { owner: req.params.id },
    { items: newItems },
    { new: true }
  );

  const updatedCartItems = updatedCart.items;
  const totalPrice = updatedCartItems.reduce(function (acc, item) {
    return acc + item.price * item.quantity;
  }, 0);

  res.status(201).json({
    status: "success",
    items: updatedCartItems,
    length: updatedCartItems.length,
    totalPrice,
  });
});
