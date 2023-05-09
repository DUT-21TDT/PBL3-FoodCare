const express = require("express");
const mainRouter = express.Router();

const menuController = require("../../controllers/MenuController.js");

mainRouter.get("/all", menuController.getAllMenus);
mainRouter.get("/menuid=:menuid", menuController.getDetails);
mainRouter.get("/menuid=:menuid/favorite-count", menuController.getFavoriteCount);

module.exports = mainRouter;