const express = require("express");
const adRouter = express.Router();

const menuController = require("../../controllers/menu.controller.js");

// MENU
adRouter.get("/all/", menuController.getAllPublicMenus);
adRouter.get("/pending", menuController.getAllPendingMenus);
adRouter.get("/menuid=:menuid/", menuController.getDetailsByMenuid);
adRouter.get("/userid=:userid", menuController.getMenusByUserid);
// adRouter.get("/menuid=:menuid/favorite-count", menuController.getFavoriteCount);

adRouter.post("/create/", menuController.createMenu);

adRouter.put("/menuid=:menuid/update/", menuController.updateMenu);
adRouter.put("/menuid=:menuid/approve/", menuController.approveMenu);
adRouter.put("/menuid=:menuid/decline/", menuController.declineMenu);

adRouter.delete("/menuid=:menuid/delete/", menuController.remove);
// adRouter.delete("/clear/", menuController.clear);

module.exports = adRouter;