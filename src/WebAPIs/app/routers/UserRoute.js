const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserController.js");
const foodController = require("../controllers/FoodController.js");


userRouter.put("/:id/change_password", userController.changePassword);


module.exports = userRouter;