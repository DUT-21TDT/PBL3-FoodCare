const express = require("express");
const adRouter = express.Router();

const foodController = require("../../controllers/food.controller.js");

// FOOD
adRouter.get("/", foodController.getAllFoods);
adRouter.get("/info/:foodId", foodController.getFoodInfoByFoodId);
// adRouter.get("/foodid=:foodid/details/", foodController.showDetailsByID);
adRouter.post("/create", foodController.createFoodInfo);
adRouter.put("/update/:foodId", foodController.updateFoodInfo);
adRouter.delete("/delete/:foodId", foodController.deleteFoodInfo);
// adRouter.delete("/clear/", foodController.clear);

module.exports = adRouter;