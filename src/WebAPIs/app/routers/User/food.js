const express = require("express");
const userRouter = express.Router();

const foodController = require("../../controllers/food.controller.js");

userRouter.get("/suggest", foodController.suggestFood);

module.exports = userRouter;