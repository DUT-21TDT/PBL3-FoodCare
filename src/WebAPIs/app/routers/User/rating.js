const express = require("express");
const userRouter = express.Router();

const ratingController = require("../../controllers/RatingController.js");

// RATING
userRouter.get("/menuid=:menuid/ratings//all", ratingController.getListRatingsByMenuid);
userRouter.get("/menuid=:menuid/ratings//ratingid=:ratingid", ratingController.getRatingByRatingid);
userRouter.post("/menuid=:menuid/ratings/create/", ratingController.create);
userRouter.delete("/menuid=:menuid/ratings//delete", ratingController.delete);

module.exports = userRouter;
