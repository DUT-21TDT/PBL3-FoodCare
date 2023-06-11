const express = require("express");
const adRouter = express.Router();

const foodController = require("../../controllers/food.controller.js");
const tagController = require("../../controllers/tag.controller.js");
// FOOD
adRouter.get("/", foodController.getAllFoods);
adRouter.get("/info/:foodId", foodController.getFoodInfoByFoodId);
adRouter.get("/tags/:foodId/", tagController.getTagsInFood);
// adRouter.get("/foodid=:foodid/details/", foodController.showDetailsByID);
adRouter.post("/create", foodController.createFoodInfo);
adRouter.put("/update/:foodId", foodController.updateFoodInfo);
adRouter.put("/add-tags/:foodId/", tagController.addFoodTags)
adRouter.delete("/remove-tags/:foodId/", tagController.removeTagFromFood)
adRouter.delete("/delete/:foodId", foodController.deleteFoodInfo);
// adRouter.delete("/clear/", foodController.clear);

module.exports = adRouter;