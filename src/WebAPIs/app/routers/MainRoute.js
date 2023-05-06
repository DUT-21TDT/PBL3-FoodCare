const express = require("express");
const mainRouter = express.Router();
const foodController = require("../controllers/FoodController.js");

mainRouter.get("/foods", foodController.getAllFoods);
mainRouter.get("/foods/foodid=:id", foodController.getFoodByID);

module.exports = mainRouter;