const express = require("express");
const adRouter = express.Router();

const menuController = require("../../controllers/MenuController.js");

// MENU
adRouter.get("/all/", menuController.getAllMenus);
adRouter.get("/menuid=:menuid/", menuController.getDetails);
adRouter.get("/menuid=:menuid/favorite-count", menuController.getFavoriteCount);
adRouter.post("/create/", menuController.create);
adRouter.put("/menuid=:menuid/update/", menuController.update);
adRouter.delete("/menuid=:menuid/delete/", menuController.delete);
adRouter.delete("/clear/", menuController.clear);

module.exports = adRouter;