const express = require("express");
const userRouter = express.Router();

const ratingController = require("../../controllers/RatingController.js");

// RATING
userRouter.get("/menus/menuid=:menuid/ratings", ratingController.getListRatingsByMenuid);
userRouter.get("/menus/menuid=:menuid/ratings/ratingid=:ratingid", ratingController.getRatingByRatingid);
userRouter.post("/menus/menuid=:menuid/ratings/create", ratingController.create);

module.exports = userRouter;
