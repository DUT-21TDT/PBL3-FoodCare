const Food = require("../models/Food.js");
const FoodDetails = require("../models/FoodDetails.js");

exports.create = function(req, res) {

    var foodname = req.body.foodname;
    var energy = req.body.energy;
    var water = req.body.water;
    var carbohydrate = req.body.carbohydrate;
    var protein = req.body.protein;
    var lipid = req.body.lipid;

    const newFood = new Food({
        foodname: foodname
    });

    Food.create(newFood, (err, food) => {
        if (err) {
            res.status(500).json({status: false, message: "Server error", data: null});
        }

        else {
            const newFoodDetails = new FoodDetails({
                foodid: food.foodid,
                energy: energy,
                water: water,
                carbohydrate: carbohydrate,
                protein: protein,
                lipid: lipid
            });

            FoodDetails.create(newFoodDetails, (err, fooddetails) => {
                if (err) {
                    res.status(500).json({status: false, message: "Server error", data: null});
                }

                else {
                    res.status(200).json({
                        status: true, 
                        message: "Create food successully",
                        data: {
                            foodname: food.foodname,
                            ...fooddetails
                        }
                    });
                }
            })
        }
    })
}

exports.getAllFoods = function(req, res) {
    Food.getAllFoods((err, list) => {
        if (err) {
            res.status(500).json({status: false, message: "Server error", data: null});
        }

        else if (list) {
            res.status(200).json({
                status: true,
                message: "Get list of foods successfully",
                data: list
            })
        }

        else {
            res.status(404).json({
                status: false,
                message: "No food found",
                data: null
            })
        }
    })
}

exports.getFoodByID = function(req, res) {

    var id = req.params.id;

    Food.findByID(id, (err, food) => {
        if (err) {
            res.status(500).json({status: false, message: "Server error", data: null});
        }

        else if (food) {
            res.status(200).json({
                status: true,
                message: `Get food ${id} successfully`,
                data: food
            })
        }

        else {
            res.status(401).json({
                status: false,
                message: "No food found",
                data: null
            })
        }
    })
}

exports.showDetailsByID = function(req, res) {
    var id = req.params.id;

    Food.showDetailsByID(id, (err, food) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: "Server error",
                data: null
            })
        }

        else if (food) {
            res.status(200).json({
                status: true,
                message: `Get food ${id} details successfully`,
                data: food
            });
        }

        else {
            res.status(404).json({
                status: false,
                message: "No food found",
                data: null
            });
        }
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;

    FoodDetails.delete(id, (err, fdid) => {
        if (err) {
            res.status(500).json({status: false, message: "Server error"});
        }

        else if (fdid) {
            Food.delete(id, (err, fid) => {
                if (err) {
                    res.status(500).json({
                        status: false,
                        message: "Server error",
                    });
                }

                else {
                    res.status(200).json({
                        status: true,
                        message: `Delete food ${id} successfully`
                    })
                }
            })
        }

        else {
            res.status(404).json({
                status: false,
                message: "Food not found",
            });
        }
    });
}