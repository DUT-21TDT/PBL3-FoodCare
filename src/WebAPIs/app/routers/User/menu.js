const express = require("express");
const userRouter = express.Router();

const menuController = require("../../controllers/MenuController.js");

// MENU
userRouter.get("/userid=:userid", menuController.getMenusByUserid);
userRouter.get("/menuid=:menuid/favorite-count", menuController.getFavoriteCount);

module.exports = userRouter;
