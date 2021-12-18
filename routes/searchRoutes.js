const express = require("express");

const productController = require("../controllers/productController.js");

const router = express.Router();

router.route("/").post(productController.searchProducts);

module.exports = router;
