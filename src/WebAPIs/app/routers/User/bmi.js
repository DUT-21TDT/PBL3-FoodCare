const express = require("express");
const userRouter = express.Router();

const bmiController = require("../../controllers/BMIController.js");

// BMI records
userRouter.get("/all", bmiController.getAllBMIRecords);
userRouter.get("/limit=:limit", bmiController.getLimitBMIRecords);
userRouter.get("/current", bmiController.getCurrentBMIRecord);
userRouter.post("/update", bmiController.update);

module.exports = userRouter;