const express = require("express");
const adRouter = express.Router();
const authMiddleware = require("../../middleware/AuthMiddleware.js");
const logAction = require("../../middleware/LogAction.js")

adRouter.use("/foods/", authMiddleware.isLoggedin, authMiddleware.isAdmin, require("../Admin/food.js"), logAction.logAction);
adRouter.use("/menus/", authMiddleware.isLoggedin, authMiddleware.isAdmin, require("../Admin/menu.js"), logAction.logAction);
adRouter.use("/accounts/", authMiddleware.isLoggedin, authMiddleware.isAdmin, require("../Admin/user.js"), logAction.logAction);
adRouter.use("/tags/", authMiddleware.isLoggedin, authMiddleware.isAdmin, require("../Admin/tag.js"), logAction.logAction);

module.exports = adRouter;