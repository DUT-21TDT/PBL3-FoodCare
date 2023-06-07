const express = require("express");
const adRouter = express.Router();

const foodController = require("../../controllers/food.controller.js");
const tagController = require("../../controllers/tag.controller.js");
// FOOD
adRouter.get("/", foodController.getAllFoods);
adRouter.get("/info/:foodId", foodController.getFoodInfoByFoodId);
// adRouter.get("/foodid=:foodid/details/", foodController.showDetailsByID);
adRouter.post("/create", foodController.createFoodInfo);
adRouter.put("/update/:foodId", foodController.updateFoodInfo);
adRouter.put("/update/:foodId/tags/add", tagController.addFoodTags)
adRouter.delete("/update/:foodId/tags/remove", tagController.removeTagFromFood)
adRouter.delete("/delete/:foodId", foodController.deleteFoodInfo);
// adRouter.delete("/clear/", foodController.clear);

module.exports = adRouter;