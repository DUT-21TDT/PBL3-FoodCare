const express = require("express");
const mainRouter = express.Router();

const menuController = require("../../controllers/menu.controller.js");

mainRouter.get("/all", menuController.getAllMenus);
mainRouter.get("/menuid=:menuid", menuController.getDetailsByMenuid);
mainRouter.get("/menuid=:menuid/favorite-count", menuController.getFavoriteCount);

module.exports = mainRouter;