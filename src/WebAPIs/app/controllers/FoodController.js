const Food = require("../models/Food.js");
const FoodDetails = require("../models/FoodDetails.js");

const upload = require("../config/multerconfig.js");
const uploadController = require("../controllers/UploadController.js");

//#region CREATE

// image type accepted: jpn, png
// food image should be .png
exports.create = async function(req, res) {
    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                throw new Error("Error while uploading image");
            }

            var foodname = req.body.foodname;
            var energy = req.body.energy;
            var water = req.body.water;
            var carbohydrate = req.body.carbohydrate;
            var protein = req.body.protein;
            var lipid = req.body.lipid;
            var vitamins = req.body.vitamins;
            var minerals = req.body.minerals;

            // foodname field is required
            if (!(foodname)) {
                res.status(401).json({
                    success: false, 
                    message: "Null input error", 
                    data: null
                });

                return;
            }

            // Get image url
            let imageUrl;
            if (!req.file) {
                imageUrl = null;
            } else {
                const filePath = req.file.path;
                imageUrl = await uploadController.uploadImage(filePath);
            }
            //-------------------------------------------------------------------------------------------

            const newFood = new Food({
                foodname: foodname,
                foodimage: imageUrl,
            });

            const food = await Food.create(newFood);

            try {
                const newFoodDetails = new FoodDetails({
                    foodid: food.foodid,
                    energy: energy,
                    water: water,
                    carbohydrate: carbohydrate,
                    protein: protein,
                    lipid: lipid,
                    vitamins: vitamins,
                    minerals: minerals,
                });
    
                const fooddetails = await FoodDetails.create(newFoodDetails);

                if (fooddetails) {
                    res.status(200).json({
                        success: true, 
                        message: "Create food successully",
                        data: {
                            foodname: food.foodname,
                            foodimage: food.foodimage,
                            ...fooddetails
                        }
                    });
                }

                else {
                    await Food.delete(id);

                    res.status(401).json({
                        success: false,
                        message: "Create food failed",
                        data: null,
                    });
                }
            }

            catch (err) {
                await Food.delete(id);
                throw err;
            }
    
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

exports.createDetails = async function(req, res) {
    try {
        var foodid = req.params.foodid;

        var energy = req.body.energy;
        var water = req.body.water;
        var carbohydrate = req.body.carbohydrate;
        var protein = req.body.protein;
        var lipid = req.body.lipid;
        var vitamins = req.body.vitamins;
        var minerals = req.body.minerals;

        const newFoodDetails = new FoodDetails({
            foodid: foodid,
            energy: energy,
            water: water,
            carbohydrate: carbohydrate,
            protein: protein,
            lipid: lipid,
            vitamins: vitamins,
            minerals: minerals,
        });

        const fooddetails = await FoodDetails.create(newFoodDetails);

        if (fooddetails) {
            res.status(200).json({
                success: true,
                message: `Create nutrients information for food #${foodid} successfully`,
                data: fooddetails,
            });
        }
    }

    catch (err) {

    }
}

//#endregion

// exports.uploadImage = async function(req, res, next) {
    
//     try {
//         if (!req.files) {
//             next();
//             return;
//         }


//         upload.single('image')(req, res, async (err) => {
//             if (err) {
//                 throw new Error("Error while uploading food image");
//             }

//             const filePath = req.file.path;

//             const client = new imgur.ImgurClient({clientId: '3b3f87bc04905ee'})
        
//             const imgurResponse = await client.upload({
//                 image: fs.createReadStream(filePath),
//                 type: 'stream',
//             });

//             req.body.imageUrl = imgurResponse.data.link;

//             next();
//         });
//     }

//     catch (err) {
//         res.status(500).json({ success: false, message: err.message, data: null });
//     }
// }

//#region READ

exports.getAllFoods = async function(req, res) {
    try {
        const foodsList = await Food.getAllFoods();

        if (foodsList) {
            res.status(200).json({
                success: true,
                message: "Get list of foods successfully",
                data: {count: foodsList.length, list: foodsList}
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
        res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
    }
}

exports.getFoodByID = async function(req, res) {
    try {
        const foodid = req.params.foodid;

        const food = await Food.findByID(foodid);

        if (food) {
            res.status(200).json({
                success: true,
                message: `Get food ${foodid} successfully`,
                data: food
            })
        }

        else {
            res.status(401).json({
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


exports.showDetailsByID = async function(req, res) {
    try {
        const foodid = req.params.foodid;

        const food = await Food.getDetailsByID(foodid);

        if (food) {
            res.status(200).json({
                success: true,
                message: `Get food ${foodid} details successfully`,
                data: food
            });
        }

        else {
            const alter_food = await Food.findByID(foodid);
            if (alter_food) {
                res.status(200).json({
                    success: true,
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
                    success: false,
                    message: "Food not found",
                    data: null
                });
            }
        }
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
            data: null
        })
    }
}

//#endregion

//#region UPDATE


// (admin) update image for food
// food image should be .png

// exports.updateImage = async function(req, res) {
//     try {
//         upload.single('image')(req, res, async (err) => {
//             if (err) {
//                 throw new Error("Error while updating image");
//             }

//             let imageUrl;

//             if (!req.file) {
//                 imageUrl = null;
//             }

//             else {
//                 const filePath = req.file.path;
//                 imageUrl = await uploadController.uploadImage(filePath);
//             }


//         });
//     }

//     catch (err) {
        
//     }
// }

// (admin) update food information
exports.update = async function(req, res) {
    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                throw new Error("Error while updating food");
            }

            var foodid = req.params.foodid; 

            var foodname = req.body.foodname;
            var energy = req.body.energy;
            var water = req.body.water;
            var carbohydrate = req.body.carbohydrate;
            var protein = req.body.protein;
            var lipid = req.body.lipid;
            var vitamins = req.body.vitamins;
            var minerals = req.body.minerals;

            if (!(foodname)) {
                res.status(401).json({
                    success: false, 
                    message: "Null input error", 
                    data: null
                });

                return;
            }

            let imageUrl;
            if (!req.file) {
                imageUrl = null;
            } else {
                const filePath = req.file.path;
                imageUrl = await uploadController.uploadImage(filePath);
            }

            const newFood = new Food({
                foodname: foodname,
                foodimage: imageUrl,
            });

            const fid = await Food.update(foodid, newFood);

            const newFoodDetails = new FoodDetails({
                foodid: fid.id,
                energy: energy,
                water: water,
                carbohydrate: carbohydrate,
                protein: protein,
                lipid: lipid,
                vitamins: vitamins,
                minerals: minerals,
            })

            await FoodDetails.update(fid.id, newFoodDetails);

            if (fid) {
                res.status(200).json({
                    success: true,
                    message: `Update food #${foodid} successfully`,
                    data: fid,
                });
            }
        });
    }

    catch (err) {

    }
}

//#endregion

//#region DELETE

// (admin) Delete a food through foodid
exports.delete = async function(req, res) {
    try {
        const foodid = req.params.foodid;
        
        const fid = await Food.delete(foodid);

        if (fid) {
            res.status(200).json({
                success: true,
                message: `Delete food #${foodid} successfully`,
                data: fid
            });
        }

        else {
            res.status(404).json({
                success: false,
                message: "Food not found",
                data: null
            });  
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

// (admin) Clear all food in the system
exports.clear = async function(req, res) {
    try {
        const count = await Food.clear();
        res.status(200).json({
            success: true,
            message: `Clear all foods successfully`,
            data: count
        });
    }

    catch (err) {
        res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
    }
}

//#endregion