const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserController.js");
const authMiddleware = require("../middleware/AuthMiddleware.js");


userRouter.put("/:id/change_password", authMiddleware.isLoggedin, userController.changePassword);
userRouter.put("/:id/uploadavatar", authMiddleware.isLoggedin, userController.uploadAvatar);


module.exports = userRouter;