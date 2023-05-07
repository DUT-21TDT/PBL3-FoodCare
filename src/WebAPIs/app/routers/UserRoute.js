const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserController.js");
const menuController = require("../controllers/MenuController.js");
const bmiController = require("../controllers/BMIController.js");
const ratingController = require("../controllers/RatingController.js");
const authMiddleware = require("../middleware/AuthMiddleware.js");

// PROFILE
userRouter.get("/userid=:userid/profile", authMiddleware.isLoggedin, userController.viewProfile);
userRouter.put("/change-password", authMiddleware.isLoggedin, userController.changePassword);
userRouter.put("/upload-avatar", authMiddleware.isLoggedin, userController.uploadAvatar);
userRouter.put("/update-profile", authMiddleware.isLoggedin, userController.updateProfile);

// BMI records
userRouter.get("/bmi-records/all", authMiddleware.isLoggedin, bmiController.getAllBMIRecords);
userRouter.get("/bmi-records/limit=:limit", authMiddleware.isLoggedin, bmiController.getLimitBMIRecords);
userRouter.get("/bmi-records/current", authMiddleware.isLoggedin, bmiController.getCurrentBMIRecord);
userRouter.post("/bmi-records/update", authMiddleware.isLoggedin, bmiController.update);

// MENU
userRouter.get("/userid=:userid/menus", authMiddleware.isLoggedin, menuController.getMenusByUserid);
userRouter.get("/menus/menuid=:menuid/favorite-count", authMiddleware.isLoggedin, menuController.getFavoriteCount);

// RATING
userRouter.get("/menus/menuid=:menuid/ratings", authMiddleware.isLoggedin, ratingController.getListRatingsByMenuid);
userRouter.get("/menus/menuid=:menuid/ratings/ratingid=:ratingid", authMiddleware.isLoggedin, ratingController.getRatingByRatingid);
userRouter.post("/menus/menuid=:menuid/ratings/create", authMiddleware.isLoggedin, ratingController.create);

module.exports = userRouter;