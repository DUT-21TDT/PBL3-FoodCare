const express = require("express");
const mainRouter = express.Router();
const foodController = require("../controllers/FoodController.js");
const menuController = require("../controllers/MenuController.js");

mainRouter.get("/foods/all", foodController.getAllFoods);
mainRouter.get("/foods/foodid=:id", foodController.getFoodByID);

mainRouter.get("/menus/all", menuController.getAllMenus);
mainRouter.get("/menus/menuid=:menuid/favorite-count", menuController.getFavoriteCount);

module.exports = mainRouter;