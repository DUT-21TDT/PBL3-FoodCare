const express = require("express");
const mainRouter = express.Router();

mainRouter.use("/public/foods", require("../Guest/food.js"));
mainRouter.use("/public/menus", require("../Guest/menu.js"));

module.exports = mainRouter;