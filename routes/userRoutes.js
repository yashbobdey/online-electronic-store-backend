//user routes
/* eslint-disable import/newline-after-import */
const express = require("express");
const userController = require(`../controllers/userController`);

const router = express.Router(); //middeleware
// const queryFinder = require("../middlewares/queryFinder");
// const User = require("../models/userModel");
router.route("/").get(userController.getAllUsers).post(userController.addUser);

router.route("/login").post(userController.login);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/changePassword/:id").patch(userController.changePassword);

module.exports = router;
