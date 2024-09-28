const productRouter = require("./product");
const userRouter = require("./user");
const transactionRouter = require("./transaction");
const promoRouter = require("./promo");
const authRouter = require("./auth");

const route = require("express").Router();

route.use("/product", productRouter);
route.use("/user", userRouter);
route.use("/transaction", transactionRouter);
route.use("/promo", promoRouter);

// auth
route.use("/auth", authRouter);

module.exports = route;
