const express = require("express");
const adRouter = express.Router();
const authMiddleware = require("../middleware/AuthMiddleware.js");
const userController = require("../controllers/UserController.js");
const foodController = require("../controllers/FoodController.js");
const menuController = require("../controllers/MenuController.js");

// USER
adRouter.get("/users/all/", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.getAllUsers);
adRouter.get("/users/userid=:userid/", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.getUserByID);
adRouter.put("/users/userid=:userid/block/", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.block);
adRouter.put("/users/userid=:userid/unblock/", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.unblock);
adRouter.put("/users/userid=:userid/change-permission/", authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.changePermission);

// FOOD
adRouter.get("/foods/all/", authMiddleware.isLoggedin, authMiddleware.isAdmin,foodController.getAllFoods);
adRouter.get("/foods/foodid=:foodid/", authMiddleware.isLoggedin, authMiddleware.isAdmin,foodController.getFoodByID);
adRouter.get("/foods/foodid=:foodid/details/", authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.showDetailsByID);
adRouter.post("/foods/create/", authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.create);
adRouter.put("/foods/foodid=:foodid/update/", authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.update);
adRouter.delete("/foods/foodid=:foodid/delete/", authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.delete);
adRouter.delete("/foods/clear/", authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.clear);

// MENU
adRouter.get("/menus/all/", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.getAllMenus);
adRouter.get("/menus/menuid=:menuid/", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.getDetails);
adRouter.post("/menus/create/", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.create);
adRouter.put("/menus/menuid=:menuid/update/", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.update);
adRouter.delete("/menus/menuid=:menuid/delete/", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.delete);
adRouter.delete("/menus/clear/", authMiddleware.isLoggedin, authMiddleware.isAdmin, menuController.clear);

module.exports = adRouter;