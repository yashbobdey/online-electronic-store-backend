// importing libraries
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//Error Handling
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

//Routers
const userRouter = require(`./routes/userRoutes`);
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRoutes.js");
const orderRouter = require("./routes/orderRoutes");
const searchRouter = require("./routes/searchRoutes");

// ----------------------------------  app ----------------------------
const app = express();

//----------------------------------- middlewares ---------------------

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//------------------------------------ Routes -------------------------

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);
app.use("/search", searchRouter);
//------------------------------------ Any other Route ------------------

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ----------------------------------- Global Error Handler -----------------

app.use(globalErrorHandler);

module.exports = app;
