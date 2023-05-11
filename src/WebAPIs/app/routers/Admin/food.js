const express = require("express");
const adRouter = express.Router();

const foodController = require("../../controllers/food.controller.js");

// FOOD
adRouter.get("/all/", foodController.getAllFoods);
adRouter.get("/foodid=:foodid/", foodController.getFoodInfoByFoodId);
// adRouter.get("/foodid=:foodid/details/", foodController.showDetailsByID);
adRouter.post("/create/", foodController.createFoodInfo);
adRouter.put("/foodid=:foodid/update/", foodController.updateFoodInfo);
adRouter.delete("/foodid=:foodid/delete/", foodController.deleteFoodInfo);
// adRouter.delete("/clear/", foodController.clear);

module.exports = adRouter;