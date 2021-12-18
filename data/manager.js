const fs = require("fs");
require(`dotenv`).config({ path: "../.env" });
const connectDatabase = require("../database");
const Product = require("../models/Product");

connectDatabase();
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`));
// console.log(products);

const importData = async () => {
  try {
    await Product.create(products);
    console.log("Data imported successfully!");
  } catch (er) {
    console.log(er);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data deleted successfully!");
  } catch (er) {
    console.log(er);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
} else {
  console.log("Command not suported.");
  process.exit();
}
