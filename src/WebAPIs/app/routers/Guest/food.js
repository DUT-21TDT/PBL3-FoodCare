const express = require("express");
const mainRouter = express.Router();

const foodController = require("../../controllers/food.controller.js");

mainRouter.get("/all", foodController.getAllFoods);
mainRouter.get("/foodid=:foodid", foodController.getFoodInfoByFoodId);

module.exports = mainRouter;