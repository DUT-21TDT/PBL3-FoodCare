const Food = require("../models/Food.js");
const FoodDetails = require("../models/FoodDetails.js");
const Bmi = require("../models/BMI.js");
const Tag = require("../models/Tag.js");

// [GET] /foods
async function getAllFoods(req, res) {
    try {
        const foodsList = await Food.getAllFoods();

        if (foodsList.length > 0) {

            // let foods = []

            // for (let f of foodsList) {
            //     const nutrients = await Food.getDetailsByID(f.foodid);
            //     const _food = {
            //         "foodId": f.foodid,
            //         "foodName": f.foodname,
            //         "foodImage": f.foodimage,
            //         "lastUpdate": f.lastUpdate.toLocaleString('en-GB'),
            //         "Energy": nutrients.energy,
            //         "Carbohydrate": nutrients.carbohydrate,
            //         "Lipid": nutrients.lipid,
            //         "Protein": nutrients.protein,
            //         "Vitamins": nutrients.vitamins,
            //         "Minerals": nutrients.minerals
            //     }

            //     foods.push(_food);
            // }

            res.status(200).json({
                success: true,
                message: "Get list of foods successfully",
                data: {
                    count: foodsList.length, 
                    list: foodsList
                }
            });
        }

        else {
            res.status(200).json({
                success: true,
                message: "No food found",
                data: null
            })
        }
    }

    catch (err) {
        res.status(500).json({
            success: false, 
            message: "Server error: " + err.message, 
            data: null
        });
    }
}

// [GET] /foods/:foodId
async function getFoodInfoByFoodId(req, res) {
    try {
        const foodId = req.params.foodId;

        const food = await Food.getDetailsByID(foodId);

        if (food) {
            res.status(200).json({
                success: true,
                message: `Get food #${foodId} successfully`,
                data: food
            })
        }

        else {
            res.status(404).json({
                success: false,
                message: "Food not found",
                data: null
            })
        }
    }

    catch (err) {
        res.status(500).json({
            success: false, 
            message: "Server error: " + err.message, 
            data: null
        });
    }
}

// [POST] /foods/create
const createFoodInfo = async (req, res, next) => {
    try {
            const foodName = req.body.foodName;
            const energy = req.body.energy;
            const imageUrl = req.body.foodImage;
            const carbohydrate = req.body.carbohydrate;
            const protein = req.body.protein;
            const lipid = req.body.lipid;
            const vitamins = req.body.vitamins;
            const minerals = req.body.minerals;

            // foodName field is required
            if (!(foodName)) {
                res.status(400).json({
                    success: false, 
                    message: "Null input error", 
                    data: null
                });
                return;
            }

            const newFood = new Food({
                foodname: foodName,
                foodimage: imageUrl,
                lastUpdate: new Date(),
            });

            const food = await Food.create(newFood);

            try {
                const newFoodDetails = new FoodDetails({
                    foodid: food.foodid,
                    energy: energy,
                    carbohydrate: carbohydrate,
                    protein: protein,
                    lipid: lipid,
                    vitamins: vitamins,
                    minerals: minerals,
                });
    
                const foodDetails = await FoodDetails.create(newFoodDetails);

                if (foodDetails) {
                    res.status(200).json({
                        success: true, 
                        message: "Create food successully",
                        data: {
                            foodname: food.foodname,
                            foodimage: food.foodimage,
                            lastUpdate: food.lastUpdate.toLocaleString('en-GB'),
                            ...foodDetails
                        }
                    });

                }

                else {
                    await Food.delete(id);

                    res.status(403).json({
                        success: false,
                        message: "Create food failed",
                        data: null,
                    });
                }

                req.username = req.data.username;
                req.action = `Create food #${food.foodid}`;
                next();
            }

            catch (err) {
                await Food.delete(id);
                throw err;
            }
    
            req.username = (req.data).username;
            req.action = `Create food #${food.foodid}`;
            next();
    }
    catch (err) {
        res.status(500).json({
            success: false, 
            message: "Server error: " + err.message, 
            data: null
        });
    }
}

const suggestFood = async (req, res, next) => {
    try {
        const user = req.data;
        const measurement = await Bmi.getCurrentMeasurement(user.userid);

        if (!measurement) {
            const foods = await Food.getAllFoods();
            foods.map(f => f.foodid);

            return res.status(200).json({
                success: true,
                message: `Suggest food for user ${user.username}`,
                data: foods
            })
        }

        const bmi = 10000 * measurement.weight / (measurement.height * measurement.height);

        // normal
        let suggestFoods = new Set();
        if (bmi <= 22.9 && bmi >= 18.5) {
            
            const _foods = await Tag.getFoodFromTags([]);

            if (_foods) _foods.forEach(food => suggestFoods.add(food.foodid));

        }

        // skinny
        else if (bmi < 18.5) {
            console.log("skinny");
            const suggestTags = ["Weight gain", "High calories", "Nut", "Carbohydrate", "Dessert"];

            for (var tag of suggestTags) {
                const _tag = await Tag.getTagByTagname(tag);
                if (_tag) {
                    const _foods = await Tag.getFoodFromTags([_tag.tagid]);

                    if (_foods) _foods.forEach(food => suggestFoods.add(food.foodid));
                }
            }
        }

        // kinda fat
        else if (bmi > 22.9) {
            console.log("fat");
            const suggestTags = ["Weight lose", "Low calories", "Vegetable", "Protein"];

            for (var tag of suggestTags) {
                const _tag = await Tag.getTagByTagname(tag);
                if (_tag) {
                    const _foods = await Tag.getFoodFromTags([_tag.tagid]);

                    if (_foods) _foods.forEach(food => suggestFoods.add(food.foodid));
                }
            }
        }

        res.status(200).json({
            success: true,
            message: `Suggest food for user ${user.username}`,
            data: [...suggestFoods]
        });
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
            data: null
        });
    }
}

// [PUT] /foods/update/:foodId
const updateFoodInfo = async (req, res, next) => {
    try {
        // get body
        const foodId = req.params.foodId;
        const foodName = req.body.foodName;
        const foodImage = req.body.foodImage;
        const energy = req.body.energy;
        const carbohydrate = req.body.carbohydrate;
        const protein = req.body.protein;
        const lipid = req.body.lipid;
        const vitamins = req.body.vitamins;
        const minerals = req.body.minerals;
        // update food
        const newFood = new Food({
            foodname: foodName,
            foodimage: foodImage,
            lastUpdate: new Date(),
        });

        await Food.update(foodId, newFood);

        // update nutrition
        const nutrients = new FoodDetails({
            foodid: foodId,
            energy: energy,
            carbohydrate: carbohydrate,
            protein: protein,
            lipid: lipid,
            vitamins: vitamins,
            minerals: minerals,
        });

        FoodDetails.update(foodId, nutrients);

        res.status(200).json({
            "success": true,
            "message":  `Update foodInfo with foodId = ${foodId} successfully.`
        });

        req.username = req.data.username;
        req.action = `Update food #${foodId}`;
        next();

    } catch (error) {
        console.log({message: error});

        res.status(500).json({
            "success": false,
            "message":  error
        });
    }
};

// [DELETE]  /foods/delete/:foodId
const deleteFoodInfo = async (req, res, next) => {
    try {
        // get body
        const foodId = req.params.foodId;
        const response = await Food.delete(foodId);

        if (response) {
            res.status(200).json({
                success: true,
                message: `Delete food #${foodId} successfully`,
                data: response.id
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Food not found",
                data: null
            });
        }

        req.username = req.data.username;
        req.action = `Delete food #${foodId}`;
        next();

    } catch (error) {
        console.log({message: error});
        
        res.status(500).json({
            "success": false,
            "message":  error
        });

    }
}


module.exports = {
    getAllFoods,
    getFoodInfoByFoodId,
    suggestFood,
    createFoodInfo,
    updateFoodInfo,
    deleteFoodInfo,
};