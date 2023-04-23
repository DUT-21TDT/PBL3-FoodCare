const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserController.js");
const foodController = require("../controllers/FoodController.js");

userRouter.get("/foods", foodController.getAllFoods);
userRouter.get("/foods/:id", foodController.getFoodByID);

userRouter.put("/:id/change_password", userController.changePassword);


module.exports = userRouter;