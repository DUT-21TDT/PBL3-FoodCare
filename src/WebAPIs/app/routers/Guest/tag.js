const express = require("express");
const mainRouter = express.Router();

const tagController = require("../../controllers/tag.controller.js");

mainRouter.get("/", tagController.getAllTags);
mainRouter.get("/tagid=:tagid", tagController.getTagById);

module.exports = mainRouter;