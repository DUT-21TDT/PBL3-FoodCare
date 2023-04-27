const Food = require("../models/Food.js");
const FoodDetails = require("../models/FoodDetails.js");

exports.create = async function(req, res)
{
    try {
        var foodname = req.body.foodname;
        var energy = req.body.energy;
        var water = req.body.water;
        var carbohydrate = req.body.carbohydrate;
        var protein = req.body.protein;
        var lipid = req.body.lipid;

        if (!(foodname)) {
            res.status(401).json({status: false, message: "Null input error", data: null});
            return;
        }
    
        const newFood = new Food({
            foodname: foodname
        });
    
        const food = await Food.create(newFood);


        const newFoodDetails = new FoodDetails({
            foodid: food.foodid,
            energy: energy,
            water: water,
            carbohydrate: carbohydrate,
            protein: protein,
            lipid: lipid
        });

        const fooddetails = await FoodDetails.create(newFoodDetails)

        res.status(200).json({
            status: true, 
            message: "Create food successully",
            data: {
                foodname: food.foodname,
                ...fooddetails
            }
        });
    }
    
    catch (err) {
        res.status(500).json({status: false, message: "Server error", data: null});
    }
}


exports.getAllFoods = async function(req, res) {
    try {
        const foodsList = await Food.getAllFoods();

        if (foodsList) {
            res.status(200).json({
                status: true,
                message: "Get list of foods successfully",
                data: {count: foodsList.length, list: foodsList}
            });
        }

        else {
            res.status(404).json({
                status: false,
                message: "No food found",
                data: null
            })
        }
    }

    catch (err) {
        res.status(500).json({status: false, message: "Server error", data: null});
        throw err;
    }
}

exports.getFoodByID = async function(req, res) {
    try {
        const id = req.params.id;

        const food = await Food.findByID(id);

        if (food) {
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
    }

    catch (err) {
        res.status(500).json({status: false, message: "Server error", data: null});
    }
}


exports.showDetailsByID = async function(req, res) {
    try {
        const id = req.params.id;

        const food = await Food.getDetailsByID(id);

        if (food) {
            res.status(200).json({
                status: true,
                message: `Get food ${id} details successfully`,
                data: food
            });
        }

        else {
            const alter_food = await Food.findByID(id);
            if (alter_food) {
                res.status(200).json({
                    status: true,
                    mesage: "Food found but food's information not found",
                    data: {
                        foodid: alter_food.foodid,
                        foodname: alter_food.foodname,
                        fooddetails: null,
                    }
                })
            }

            else {
                res.status(404).json({
                    status: false,
                    message: "No food found",
                    data: null
                });
            }
        }
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: "Server error",
            data: null
        })
    }
}


exports.delete = async function(req, res) {
    try {
        const id = req.params.id;

        await FoodDetails.delete(id);
        
        const fid = await Food.delete(id);

        if (fid) {
            res.status(200).json({
                status: true,
                message: `Delete food ${id} successfully`,
                data: fid
            })
        }

        else {
            res.status(404).json({
                status: false,
                message: "Food not found",
                data: null
            });  
        }
    }

    catch (err) {
        res.status(500).json({status: false, message: "Server error", data: null});
    }
}