const express = require("express");
const adRouter = express.Router();

const userController = require("../../controllers/UserController.js");
const authMiddleware = require("../../middleware/AuthMiddleware.js");

// USER
adRouter.get("/all/", userController.getAllUsers);
adRouter.get("/userid=:userid/", userController.getUserByID);
adRouter.put("/userid=:userid/block/", userController.block);
adRouter.put("/userid=:userid/unblock/", userController.unblock);
adRouter.put("/userid=:userid/change-permission/", userController.changePermission);

module.exports = adRouter;