const express = require("express");
const userRouter = express.Router();

const menuController = require("../../controllers/menu.controller.js");

// MENU
userRouter.get("/mymenu", menuController.getOwnMenus);
userRouter.get("/menuid=:menuid", menuController.getDetailsByMenuid);
userRouter.get("/userid=:userid", menuController.getMenusByUserid);
// userRouter.get("/menuid=:menuid/favorite-count", menuController.getFavoriteCount);
userRouter.post("/create/", menuController.createMenu);
userRouter.put("/menuid=:menuid/propose/", menuController.proposeMenu);
userRouter.put("/menuid=:menuid/update", menuController.updateMenu);
userRouter.delete("/menuid=:menuid/delete", menuController.remove);

module.exports = userRouter;