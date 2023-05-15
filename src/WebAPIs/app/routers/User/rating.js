const express = require("express");
const userRouter = express.Router();

const ratingController = require("../../controllers/RatingController.js");

// RATING
userRouter.get("/menuid=:menuid/all", ratingController.getListRatingsByMenuid);
userRouter.get("/menuid=:menuid/ratingid=:ratingid", ratingController.getRatingByRatingid);
userRouter.post("/menuid=:menuid/create/", ratingController.create);
userRouter.delete("/menuid=:menuid/delete", ratingController.delete);

module.exports = userRouter;
