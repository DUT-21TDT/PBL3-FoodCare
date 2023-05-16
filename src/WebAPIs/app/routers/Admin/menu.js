const express = require("express");
const adRouter = express.Router();

const menuController = require("../../controllers/menu.controller.js");

// MENU
adRouter.get("/", menuController.getAllPublicMenus); // ?userid=[?]
adRouter.get("/pending", menuController.getAllPendingMenus);
adRouter.get("/info/:menuid/", menuController.getDetailsByMenuid);
adRouter.get("/favorite-count/:menuid", menuController.getFavoriteCount);
adRouter.put("/update/:menuid", menuController.updateMenu);
adRouter.put("/approve/:menuid", menuController.approveMenu);
adRouter.delete("/delete/:menuid", menuController.remove);
// adRouter.delete("/clear/", menuController.clear);

module.exports = adRouter;