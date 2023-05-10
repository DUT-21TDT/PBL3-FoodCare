const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../../middleware/AuthMiddleware.js");
const logAction = require("../../middleware/LogAction.js")

userRouter.use("/profile", authMiddleware.isLoggedin, require("../User/profile"), logAction.logAction);
userRouter.use("/bmi-records", authMiddleware.isLoggedin, require("../User/bmi"), logAction.logAction);
userRouter.use("/menus", authMiddleware.isLoggedin, require("../User/menu"), logAction.logAction);
userRouter.use("/menus/menuid=:menuid/ratings", authMiddleware.isLoggedin, require("../User/rating"), logAction.logAction);

module.exports = userRouter;