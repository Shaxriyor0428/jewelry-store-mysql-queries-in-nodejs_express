const express = require("express");
const indexRouter = express.Router();
const category = require("./categores");
const customer = require("./customers");
const contract = require("./contracts");
const install_plans = require("./install_plans");
const payments = require("./payments");
const products = require("./products");
const status = require("./status");



indexRouter.use("/customer",customer);
indexRouter.use("/category",category);
indexRouter.use("/contract",contract);
indexRouter.use("/installPay",install_plans);
indexRouter.use("/payment",payments);
indexRouter.use("/product",products);
indexRouter.use("/status",status);


module.exports = indexRouter;

