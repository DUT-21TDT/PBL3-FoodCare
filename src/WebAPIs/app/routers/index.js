const express = require("express");
const Router = express.Router();
// Web's routes
const authRouter = require("./Auth/AuthRoute.js");
const guestRouter = require("./Guest/index.js");
const adRouter = require("./Admin/index.js");
const userRouter = require("./User/index.js");

// Router.use("/test", require("./test.js"));

Router.use("/public", guestRouter);

Router.use("/", authRouter);

Router.use("/admin-access", adRouter);

Router.use("/", userRouter);

module.exports = Router;