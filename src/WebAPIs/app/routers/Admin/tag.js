const express = require("express");
const adRouter = express.Router();

const tagController = require("../../controllers/tag.controller.js");

// FOOD
adRouter.get("/", tagController.getAllTags);
adRouter.get("/tagid=:tagid", tagController.getTagById);
adRouter.post("/create", tagController.createTag);
// adRouter.put("/update/:foodId", foodController.updateFoodInfo);
adRouter.delete("/delete/tagid=:tagid/", tagController.removeTag);
// adRouter.delete("/clear/", foodController.clear);

module.exports = adRouter;