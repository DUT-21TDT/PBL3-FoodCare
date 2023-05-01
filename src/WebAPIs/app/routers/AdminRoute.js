const express = require("express");
const adRouter = express.Router();
const authMiddleware = require("../middleware/AuthMiddleware.js");
const userController = require("../controllers/UserController.js");
const foodController = require("../controllers/FoodController.js");
const menuController = require("../controllers/MenuController.js");

adRouter.get("/users", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.getAllUsers);
adRouter.get("/users/:id", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.getUserByID);

adRouter.put("/users/:id/block", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.block);
adRouter.put("/users/:id/unblock", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.unblock);
adRouter.put("/users/:id/change_password", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.changePassword);
// adRouter.delete("/users/:id/delete", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.delete);


adRouter.get("/foods", authMiddleware.isLoggedin, authMiddleware.isAdmin,foodController.getAllFoods);
adRouter.get("/foods/:id", authMiddleware.isLoggedin, authMiddleware.isAdmin,foodController.getFoodByID);
adRouter.get("/foods/:id/details", authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.showDetailsByID);
adRouter.post("/foods/create", authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.create);
//adRouter.put
adRouter.delete("/foods/:id/delete", authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.delete);
adRouter.delete("/foods/clear", authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.clear);

adRouter.get("/menus", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.getAllMenus);
adRouter.get("/menus/:id", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.getDetails);
adRouter.post("/menus/create", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.create);
adRouter.delete("/menus/:id/delete", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.delete);
adRouter.delete("/menus/clear", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.clear);

module.exports = adRouter;