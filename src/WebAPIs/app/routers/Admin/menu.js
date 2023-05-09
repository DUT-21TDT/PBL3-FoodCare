const express = require("express");
const adRouter = express.Router();

const menuController = require("../../controllers/MenuController.js");
const authMiddleware = require("../../middleware/AuthMiddleware.js");

// MENU
adRouter.get("/all/", menuController.getAllMenus);
adRouter.get("/menuid=:menuid/", menuController.getDetails);
adRouter.post("/create/", menuController.create);
adRouter.put("/menuid=:menuid/update/", menuController.update);
adRouter.delete("/menuid=:menuid/delete/", menuController.delete);
adRouter.delete("/clear/", menuController.clear);

module.exports = adRouter;