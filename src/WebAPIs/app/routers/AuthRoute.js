const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/AuthController.js");
const authMiddleware = require("../middleware/AuthMiddleware.js");

authRouter.post("/login", authMiddleware.isLoggedout, authController.login);
authRouter.post("/sign_up", authMiddleware.isLoggedout,authController.register);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
