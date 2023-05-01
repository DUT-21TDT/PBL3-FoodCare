const Food = require("../models/Food.js");
const Menu = require("../models/Menu.js");

exports.create = async function(req, res) {
    try {
        var menuname = req.body.menuname;
        var foodsList = req.body.foodsList;
        var creator = req.data.username;

        if ((!menuname) || (!creator)) {
            res.status(401).json({
                success: false,
                message: "Invalid input",
                data: null
            })
        }

        const newMenu = new Menu({
            menuname: menuname,
            creator: creator,
            foodsList: foodsList
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
            res.status(401).json({
                success: false,
                message: "Failed",
                data: null
            })
        }
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            data: null
        });
    }
}


exports.getAllMenus = async function(req, res) {
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
            message: "Server error",
            data: null
        });
    }
}


exports.getDetails = async function(req, res) {
    try {
        var id = req.params.id;

        const menudetails = await Menu.getDetailsByID(id);

        if (menudetails) {
            res.status(200).json({
                success: true,
                message: "Get menu successfully",
                data: menudetails
            });
        }

        else {
            res.status(401).json({
                success: false,
                message: "Menu not found",
                data: null
            })
        }
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            data: null
        })
    }
}


exports.delete = async function(req, res) {
    try {
        const id = req.params.id;

        const mid = await Menu.delete(id);

        if (mid) {
            res.status(200).json({
                success: true,
                message: `Delete menu ${id} successfully`,
                data: mid,
            });
        }

        else {
            res.status(404).json({
                success: false,
                message: "Menu not found",
                data: null,
            })
        }
    }

    catch (err) {
        res.status(500).json({status: false, message: "Server error", data: null});
        throw err;
    }
}

exports.clear = async function(req, res) {
    try {
        const count = await Menu.clear();

        res.status(200).json({
            success: true,
            message: "Clear all menus successfully",
            data: count
        });
    }

    catch (err) {
        res.status(500).json({success: false, message: "Server error", data: null});
    }
}