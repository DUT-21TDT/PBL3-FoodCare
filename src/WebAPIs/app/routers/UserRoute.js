const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserController.js");
const menuController = require("../controllers/MenuController.js");
const bmiController = require("../controllers/BMIController.js");
const ratingController = require("../controllers/RatingController.js");
const authMiddleware = require("../middleware/AuthMiddleware.js");

userRouter.get("/userid=:id/profile", authMiddleware.isLoggedin, userController.getUserByID);

userRouter.get("/userid=:userid/menus", authMiddleware.isLoggedin, menuController.getMenusByUserid);

userRouter.put("/change-password", authMiddleware.isLoggedin, userController.changePassword);

userRouter.put("/upload-avatar", authMiddleware.isLoggedin, userController.uploadAvatar);

userRouter.put("/update-profile", authMiddleware.isLoggedin, userController.updateProfile);

userRouter.get("/bmi-records/all", authMiddleware.isLoggedin, bmiController.getAllBMIRecords);
userRouter.get("/bmi-records/limit=:limit", authMiddleware.isLoggedin, bmiController.getLimitBMIRecords);
userRouter.get("/bmi-records/current", authMiddleware.isLoggedin, bmiController.getCurrentBMIRecords);

userRouter.post("/update-bmi", authMiddleware.isLoggedin, bmiController.update);

userRouter.get("/menus/menuid=:menuid/ratings", authMiddleware.isLoggedin, ratingController.getListRatingsByMenuid);
userRouter.get("/menus/menuid=:menuid/ratings/ratingid=:ratingid", authMiddleware.isLoggedin, ratingController.getRatingByRatingid);

userRouter.post("/menus/menuid=:menuid/ratings/create", authMiddleware.isLoggedin, ratingController.create);

userRouter.get("/menus/menuid=:menuid/favorite-count", authMiddleware.isLoggedin, menuController.getFavoriteCount);
module.exports = userRouter;