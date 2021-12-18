//user controller
const User = require("../models/User.js");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcryptjs");

// const asyncHandler = require("../utils/catchAsync");

const AppError = require("../utils/AppError");
const Cart = require("../models/Cart.js");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select({ __v: 0, password: 0 });
  res.status(201).json({
    status: "success",
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next({
      status: 400,
      message: "employee not found",
    });
  }
  res.status(201).json({
    status: "success",
    data: user,
  });
});

exports.addUser = asyncHandler(async (req, res, next) => {
  console.log("request body: ", req.body);

  // token = req.body.token
  // plaintext = verify(token)
  // pla
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(
      new AppError("Email already exists! Please use another Email!", 400)
    );
  }
  const newUser = await User.create(req.body);
  const newCart = await Cart.create({ owner: newUser._id });

  // const recentlyAddedUser = await User.findOne({ email: req.body.email });
  // console.log(recentlyAddedUser);
  // const newCart = await Cart.create({ owner: recentlyAddedUser._id });
  //********************  Something to do here.... */
  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user_id = req.params.id;
  console.log("user id : ", user_id);
  const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {
    new: true,
    runValidators: true,
  });
  console.log("updated user : ", updatedUser);

  res.status(201).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Deleted Successfully!",
  });
});
exports.login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email) return next(new AppError("Please provide email id!", 401));
  let user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Email provided is wrong.", 401));
  }

  let verified = await user.matchPasswords(password);
  if (!verified)
    // return next({ status: 401, message: "Password provided is wrong!!" });
    return next(new AppError("Password Provided is wrong.", 401));
  let token = user.getSignedJwtToken(user._id);
  console.log("token: ", token);
  res.status(200).json({
    status: "successfully Signed in!",
    token: token,
    user,
  });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  let { password } = req.body;
  // let verified = await user.matchPasswords(password);
  // if (!verified) return next(new AppError("Password Provided is wrong.", 401));
  const newPassword = await bcrypt.hash(password, 10);
  console.log("new password", newPassword);

  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { password: newPassword },
    { new: true }
  );
  res.status(201).json({
    status: "succes",
    user,
  });
});
