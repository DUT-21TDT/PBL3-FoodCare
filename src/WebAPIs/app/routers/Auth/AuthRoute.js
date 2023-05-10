const express = require("express");
const authRouter = express.Router();
const authController = require("../../controllers/AuthController.js");
const authMiddleware = require("../../middleware/AuthMiddleware.js");
const logAction = require("../../middleware/LogAction.js");

authRouter.post("/login", authMiddleware.isLoggedout, authMiddleware.signin, authController.login, logAction.logAction);
authRouter.post("/signup", authMiddleware.isLoggedout, authMiddleware.signup, authController.register, logAction.logAction);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;