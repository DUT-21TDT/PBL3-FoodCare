const express = require("express");
const userRouter = express.Router();

const menuController = require("../../controllers/menu.controller.js");

// MENU
userRouter.get("/mymenu", menuController.getOwnMenus);
userRouter.get("/menuid=:menuid/favorite-count", menuController.getFavoriteCount);
userRouter.put("/menuid=:menuid/propose/", menuController.proposeMenu);
userRouter.post("/create/", menuController.createMenu);


module.exports = userRouter;
