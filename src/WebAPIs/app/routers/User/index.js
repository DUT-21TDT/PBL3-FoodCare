const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../../middleware/AuthMiddleware.js");

userRouter.use("/profile", authMiddleware.isLoggedin, require("../User/profile"));
userRouter.use("/bmi-records", authMiddleware.isLoggedin, require("../User/bmi"));
userRouter.use("/menus", authMiddleware.isLoggedin, require("../User/menu"));
userRouter.use("/menus/menuid=:menuid/ratings", authMiddleware.isLoggedin, require("../User/rating"));

module.exports = userRouter;