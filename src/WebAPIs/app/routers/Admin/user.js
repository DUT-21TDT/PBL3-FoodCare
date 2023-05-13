const express = require("express");
const adRouter = express.Router();

const userController = require("../../controllers/UserController.js");
const authMiddleware = require("../../middleware/AuthMiddleware.js");

// USER
adRouter.get("/", userController.getAllUsers);
adRouter.get("/:userid/", userController.getUserByID);
adRouter.put("/:username/block/", userController.block);
adRouter.put("/:userid/unblock/", userController.unblock);
adRouter.put("/:userid/change-permission/", userController.changePermission);

adRouter.delete("/delete/:username", userController.deleteUser);

module.exports = adRouter;