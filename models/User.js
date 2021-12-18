const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  address: {
    type: Object,
    required: [true, "Address is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// model method to generate jwt token .. jsonwebtoken
userSchema.methods.getSignedJwtToken = function (id) {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
      id,
    },
    "this-is-a-secret-key"
  );

  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
