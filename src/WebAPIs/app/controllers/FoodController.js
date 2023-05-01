const Food = require("../models/Food.js");
const FoodDetails = require("../models/FoodDetails.js");
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const upload = require("../config/multerconfig.js");
const uploadController = require("../controllers/UploadController.js");

const imgur = require("imgur");
const fs = require("fs");

exports.create = async function(req, res) {
    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                throw new Error("Error while uploading avatar");
            }

            var foodname = req.body.foodname;
            var energy = req.body.energy;
            var water = req.body.water;
            var carbohydrate = req.body.carbohydrate;
            var protein = req.body.protein;
            var lipid = req.body.lipid;

            if (!(foodname)) {
                res.status(401).json({success: false, message: "Null input error", data: null});
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
                    lipid: lipid
                });
    
                const fooddetails = await FoodDetails.create(newFoodDetails);

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

            catch (err) {
                await Food.delete(id);
                throw err;
            }
    
        })
    }

    catch (err) {
        res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
    }
}

// exports.create = async function(req, res)
// {
//     // console.log(req.file);
//     try {
//         var foodname = req.body.foodname;
//         var foodimage = req.body.imageUrl;
//         var energy = req.body.energy;
//         var water = req.body.water;
//         var carbohydrate = req.body.carbohydrate;
//         var protein = req.body.protein;
//         var lipid = req.body.lipid;

//         if (!(foodname)) {
//             res.status(401).json({success: false, message: "Null input error", data: null});
//             return;
//         }

//         const newFood = new Food({
//             foodname: foodname,
//             foodimage: foodimage,
//         });

//         const food = await Food.create(newFood);

//         try {
//             const newFoodDetails = new FoodDetails({
//                 foodid: food.foodid,
//                 energy: energy,
//                 water: water,
//                 carbohydrate: carbohydrate,
//                 protein: protein,
//                 lipid: lipid
//             });
    
//             const fooddetails = await FoodDetails.create(newFoodDetails)
    
//             res.status(200).json({
//                 success: true, 
//                 message: "Create food successully",
//                 data: {
//                     foodname: food.foodname,
//                     ...fooddetails
//                 }
//             });
//         }

//         catch (err) {
//             await Food.delete(id);
//             res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
//         }    
//     }
    
//     catch (err) {
//         res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
//     }
// }


exports.uploadImage = async function(req, res, next) {
    
    try {
        if (!req.files) {
            next();
            return;
        }


        upload.single('image')(req, res, async (err) => {
            if (err) {
                throw new Error("Error while uploading food image");
            }

            const filePath = req.file.path;

            const client = new imgur.ImgurClient({clientId: '3b3f87bc04905ee'})
        
            const imgurResponse = await client.upload({
                image: fs.createReadStream(filePath),
                type: 'stream',
            });

            req.body.imageUrl = imgurResponse.data.link;

            next();
        });
    }

    catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
}

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
        const id = req.params.id;

        const food = await Food.findByID(id);

        if (food) {
            res.status(200).json({
                success: true,
                message: `Get food ${id} successfully`,
                data: food
            })
        }

        else {
            res.status(401).json({
                success: false,
                message: "No food found",
                data: null
            })
        }
    }

    catch (err) {
        res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
    }
}


exports.showDetailsByID = async function(req, res) {
    try {
        const id = req.params.id;

        const food = await Food.getDetailsByID(id);

        if (food) {
            res.status(200).json({
                success: true,
                message: `Get food ${id} details successfully`,
                data: food
            });
        }

        else {
            const alter_food = await Food.findByID(id);
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
                    message: "No food found",
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


exports.uploadImage = async function(req, res) {
    try {

    }

    catch (err) {
        
    }
}


exports.delete = async function(req, res) {
    try {
        const id = req.params.id;
        
        const fid = await Food.delete(id);

        if (fid) {
            res.status(200).json({
                success: true,
                message: `Delete food ${id} successfully`,
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
        res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
    }
}

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