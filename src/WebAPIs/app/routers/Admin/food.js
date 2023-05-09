const express = require("express");
const adRouter = express.Router();

const foodController = require("../../controllers/FoodController.js");

// FOOD
adRouter.get("/all/", foodController.getAllFoods);
adRouter.get("/foodid=:foodid/", foodController.getFoodByID);
adRouter.get("/foodid=:foodid/details/", foodController.showDetailsByID);
adRouter.post("/create/", foodController.create);
adRouter.put("/foodid=:foodid/update/", foodController.update);
adRouter.delete("/foodid=:foodid/delete/", foodController.delete);
adRouter.delete("/clear/", foodController.clear);

module.exports = adRouter;