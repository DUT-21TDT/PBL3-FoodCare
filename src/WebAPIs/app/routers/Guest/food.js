const express = require("express");
const mainRouter = express.Router();

const foodController = require("../../controllers/FoodController.js");

mainRouter.get("/all", foodController.getAllFoods);
mainRouter.get("/foodid=:foodid", foodController.getFoodByID);

module.exports = mainRouter;