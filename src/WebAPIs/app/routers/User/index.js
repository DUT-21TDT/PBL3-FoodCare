const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../../middleware/AuthMiddleware.js");
const logAction = require("../../middleware/LogAction.js")

// userRouter.use("/profile/", authMiddleware.isLoggedin, require("../User/profile.js"), logAction.logAction);

userRouter.use("/profile/bmi-records/", authMiddleware.isLoggedin, require("../User/bmi.js"), logAction.logAction);
userRouter.use("/profile/", authMiddleware.isLoggedin, require("../User/profile.js"), logAction.logAction);
userRouter.use("/foods/", authMiddleware.isLoggedin, require("../User/food.js"), logAction.logAction);
userRouter.use("/menus/", authMiddleware.isLoggedin, require("../User/menu.js"), logAction.logAction);
userRouter.use("/ratings/", authMiddleware.isLoggedin, require("../User/rating.js"), logAction.logAction);


// userRouter.use("/menus/", authMiddleware.isLoggedin, require("../User/menu.js"), logAction.logAction);
// userRouter.use("/menus/menuid=:menuid/ratings", authMiddleware.isLoggedin, require("../User/rating.js"), logAction.logAction);

// console.log(userRouter.stack);

module.exports = userRouter;