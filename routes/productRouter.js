/* eslint-disable import/newline-after-import */
const express = require("express");
const productController = require(`../controllers/productController`);

const router = express.Router(); //middeleware

router
  .route("/")
  .get(productController.getAllproducts) // ------------------------- 1)
  .post(productController.addProduct);

router
  .route("/:id")
  .get(productController.getProduct) // ------------------------- 2)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router.route("/category").post(productController.getProductByCategory); // ------------------------- 3)

module.exports = router;
