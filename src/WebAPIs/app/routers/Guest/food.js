const express = require("express");
const mainRouter = express.Router();

const foodController = require("../../controllers/food.controller.js");
const authMiddleware = require("../../middleware/AuthMiddleware.js");

mainRouter.get("/",authMiddleware.isLoggedin, foodController.getAllFoods);
mainRouter.get("/:foodId", foodController.getFoodInfoByFoodId);

module.exports = mainRouter;