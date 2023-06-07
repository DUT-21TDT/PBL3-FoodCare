const express = require("express");
const mainRouter = express.Router();

const foodController = require("../../controllers/food.controller.js");
const tagController = require("../../controllers/tag.controller.js");
const authMiddleware = require("../../middleware/AuthMiddleware.js");

mainRouter.get("/", foodController.getAllFoods);
mainRouter.get("/tag-filter/", tagController.getFoodFromTagsFilter);
mainRouter.get("/:foodId", foodController.getFoodInfoByFoodId);
mainRouter.get("/:foodId/tags", tagController.getTagsInFood);

module.exports = mainRouter;