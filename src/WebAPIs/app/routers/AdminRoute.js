const express = require("express");
const adRouter = express.Router();
const authMiddleware = require("../middleware/AuthMiddleware.js");
const userController = require("../controllers/UserController.js");
const foodController = require("../controllers/FoodController.js");

adRouter.get("/users",authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.getAllUsers);
adRouter.get("/users/:id",authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.getUserByID);

adRouter.put("/users/:id/change_permission",authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.changePermission);
adRouter.put("/users/:id/change_password",authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.changePassword);
adRouter.delete("/users/:id",authMiddleware.isLoggedin, authMiddleware.isAdmin, userController.delete);


adRouter.get("/foods",authMiddleware.isLoggedin, authMiddleware.isAdmin,foodController.getAllFoods);
adRouter.get("/foods/:id",authMiddleware.isLoggedin, authMiddleware.isAdmin,foodController.getFoodByID);
adRouter.get("/foods/:id/details",authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.showDetailsByID);
adRouter.post("/foods/create",authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.create);
adRouter.delete("/foods/:id",authMiddleware.isLoggedin, authMiddleware.isAdmin, foodController.delete);

module.exports = adRouter;