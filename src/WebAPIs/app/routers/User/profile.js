const express = require("express");
const userRouter = express.Router();

const userController = require("../../controllers/UserController.js");

// PROFILE
userRouter.get("/userid=:userid/profile", userController.viewProfile);
userRouter.put("/change-password", userController.changePassword);
userRouter.put("/upload-avatar", userController.uploadAvatar);
userRouter.put("/update-profile", userController.updateProfile);

module.exports = userRouter;