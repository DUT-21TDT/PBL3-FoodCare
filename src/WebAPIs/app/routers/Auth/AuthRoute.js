const express = require("express");
const authRouter = express.Router();
const authController = require("../../controllers/AuthController.js");
const authMiddleware = require("../../middleware/AuthMiddleware.js");

authRouter.post("/login", authMiddleware.isLoggedout, authMiddleware.signin, authController.login);
authRouter.post("/signup", authMiddleware.isLoggedout, authMiddleware.signup ,authController.register);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
