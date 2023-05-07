const Menu = require("../models/Menu.js");
const Rating = require("../models/Rating.js");
const User = require("../models/User.js");

exports.create = create;
exports.getAllMenus = getAllMenus;
exports.getMenusByUserid = getMenusByUserid;
exports.getDetails = getDetails;
exports.getFavoriteCount = getFavoriteCount;
exports.update = update;
exports.delete = remove;
exports.clear = clear;


//#region CREATE

async function create(req, res) {
    try {
        var menuname = req.body.menuname;
        var foodsList = req.body.foodsList;
        var creator = req.data.username;

        // menuname and creator field is required
        if ((!menuname) || (!creator)) {
            res.status(400).json({
                success: false,
                message: "Null input error",
                data: null
            })

            return;
        }

        const newMenu = new Menu({
            menuname: menuname,
            creator: creator,
            foodsList: foodsList,
        });

        const menu = await Menu.create(newMenu);

        if (menu) {
            res.status(200).json({
                success: true,
                message: "Create menu successfully",
                data: menu
            });
        }

        else {
            res.status(403).json({
                success: false,
                message: "Create menu failed",
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

//#endregion

//#region READ

// ---- HOMEPAGE
async function getAllMenus(req, res) {
    try {
        const menusList = await Menu.getAllMenus();

        if (menusList) {
            res.status(200).json({
                success: true,
                message: "Get list of menus successfully",
                data: {
                    count: menusList.length,
                    list: menusList
                }
            });
        }

        else {
            res.status(200).json({
                success: true,
                message: "No menu found",
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

// users/userid=:id/menus
async function getMenusByUserid(req, res) {
    try {
        var userid = req.params.userid;

        const menusList = await Menu.getListMenusByUserid(userid);

        if (menusList) {
            res.status(200).json({
                success: true,
                message: `Get list of menus of userid ${userid} successfully`,
                data: {
                    count: menusList.length,
                    list: menusList
                }
            });
        }

        else {
            res.status(200).json({
                success: true,
                message: "No menu found",
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


async function getDetails(req, res) {
    try {
        var menuid = req.params.menuid;

        const menudetails = await Menu.getDetailsByID(menuid);  // a list

        if (menudetails) {

            const foods = menudetails.map(row => ({
                foodname: row.foodname,
                foodid: row.foodid,
                energy: row.Energy,
                water: row.Water,
                carbohydrate: row.Carbohydrate,
                protein: row.Protein,
                lipid: row.Lipid,
                vitamins: row.Vitamins,
                minerals: row.Minerals
            }));

            console.log(foods);

            const i_menudetails = {
                menuid: menudetails[0].menuid,
                menuname: menudetails[0].menuname,
                creator: menudetails[0].creator,
                foods: {
                    count: foods.length,
                    list: foods,
                }
            }

            res.status(200).json({
                success: true,
                message: "Get menu successfully",
                data: i_menudetails,
            });
        }

        else {
            res.status(404).json({
                success: false,
                message: "Menu not found",
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


async function getFavoriteCount(req, res) {
    try {
        const menuid = req.params.menuid;

        const count = await Rating.getFavoriteCount(menuid);

        res.status(200).json({
            success: true,
            message: `Get favorite count of menu #${menuid} successfully`,
            data: {
                menuid: menuid,
                favoriteCount: count,
            }
        });
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
            data: null,
        });
    }
}

//#endregion

//#region UPDATE

async function update(req, res) {
    try {
        var menuid = req.params.menuid;
        var newMenuname = req.body.menuname;
        var newFoodsList = req.body.foodsList;

        await Menu.update(menuid, newMenuname, newFoodsList);

        res.status(200).json({
            success: true,
            message: `Update menu #${menuid} successfully`,
            data: menuid,
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

//#endregion

//#region DELETE

async function remove(req, res) {
    try {
        var id = req.params.id;

        const mid = await Menu.delete(id);

        if (mid) {
            res.status(200).json({
                success: true,
                message: `Delete menu #${id} successfully`,
                data: mid,
            });
        }

        else {
            res.status(404).json({
                success: false,
                message: "Menu not found",
                data: null,
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

async function clear(req, res) {
    try {
        const count = await Menu.clear();

        res.status(200).json({
            success: true,
            message: "Clear all menus successfully",
            data: count
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

//#endregion