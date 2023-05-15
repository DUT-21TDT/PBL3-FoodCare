const express = require("express");
const mainRouter = express.Router();

mainRouter.use("/foods", require("../Guest/food.js"));
mainRouter.use("/menus", require("../Guest/menu.js"));

module.exports = mainRouter;