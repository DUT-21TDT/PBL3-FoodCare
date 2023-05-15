const express = require("express");
const router = express.Router();

const {
    getAllFoods,
    getFoodInfoByFoodId,
    createFoodInfo,
    updateFoodInfo,
    deleteFoodInfo,
} = require("../controllers/food.controller");

router.get("/foods", getAllFoods);
router.get("/foods/:foodId", getFoodInfoByFoodId);
router.post("/foods/create", createFoodInfo);
router.put("/foods/update/:foodId", updateFoodInfo);
router.delete("/foods/delete/:foodId", deleteFoodInfo);

module.exports = router;