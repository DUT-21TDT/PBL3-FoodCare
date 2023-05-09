const express = require("express");
const adRouter = express.Router();
const authMiddleware = require("../../middleware/AuthMiddleware.js");


adRouter.use("/foods/", authMiddleware.isLoggedin, authMiddleware.isAdmin, require("../Admin/food.js"));
adRouter.use("/menus/", authMiddleware.isLoggedin, authMiddleware.isAdmin, require("../Admin/menu.js"));
adRouter.use("/users/", authMiddleware.isLoggedin, authMiddleware.isAdmin, require("../Admin/user.js"));

module.exports = adRouter;