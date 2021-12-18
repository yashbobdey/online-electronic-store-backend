const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

//--------------------------------------------------------------------------------------- //

//********************************************************
// --------------- Get all Products ----------------------
// _______________________________________________________
exports.getAllproducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(201).json({
    status: "success",
    data: products,
    length: products.length,
  });
});

//********************************************************
// --------------- Get Single Product --------------------
// _______________________________________________________

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("product not found", 400));
  }
  res.status(201).json({
    status: "success",
    data: product,
  });
});

//********************************************************
// --------------- Get Products By Category --------------
// _______________________________________________________

exports.getProductByCategory = asyncHandler(async (req, res) => {
  const productCategory = req.body.category;
  if (!productCategory) {
    return next(new AppError("Please specify category", 400));
  }
  const products = await Product.find({ category: productCategory }).select({
    __v: 0,
    quantity: 0,
  });
  if (!products) {
    return next(
      new AppError(`No products found for ${productCategory} category.`, 400)
    );
  }

  res.status(200).json({
    status: "success",
    data: products,
    length: products.length,
  });
});

//--------------------------------------------------------------------------------------- //

exports.addProduct = asyncHandler(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  //   console.log(req.body);
  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "success",
    data: updatedProduct,
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    message: "Deleted Successfully!",
    products,
  });
});

const handleQuery = async (req, res, query) => {
  // const query = `/${text}/`;
  // console.log("query : ", query);
  // const products = await Product.find({ $text: { $search: query } });
  const products = await Product.find({ $text: { $search: query } });
  console.log("products : ", products);
  res.status(200).json({
    status: "success",
    length: products.length,

    data: products,
  });
};
// if (query) {
//   console.log(query);
//   await handleQuery(req, res, query);
// } else {
//   const products = await Product.find();
//   res.status(200).json({
//     status: "success",
//     length: products.length,
//     data: products,
//   });
// }

exports.searchProducts = asyncHandler(async (req, res) => {
  const { query, category, rating, price } = req.body;

  let q1 = {};
  let q2 = {};

  if (query !== "") {
    q1 = { $search: query };
    console.log("search query (q1) : ", q1);
  }
  if (category) {
    q2 = category;
    console.log("category query (q1) : ", q2);
  }
  let products = await Product.find({
    $text: q1,
  }).select({
    // __v: 0,
    description: 0,
    images: 0,
    review: 0,
    specification: 0,
    quantity: 0,
  });

  res.status(200).json({
    status: "success",
    length: products.length,

    data: products,
  });

  // if (query) {
  //   let products = await Product.find({}).select({
  //     __v: 0,
  //     description: 0,
  //     images: 0,
  //     review: 0,
  //     specification: 0,
  //     quantity: 0,
  //   });

  //   res.status(200).json({
  //     status: "success",
  //     length: products.length,

  //     data: products,
  //   });
  // } else {
  //   const products = await Product.find().select({
  //     __v: 0,
  //     description: 0,
  //     images: 0,
  //     review: 0,
  //     specification: 0,
  //     quantity: 0,
  //   });
  //   res.status(200).json({
  //     status: "success",
  //     length: products.length,

  //     data: products,
  //   });
  // }
});
