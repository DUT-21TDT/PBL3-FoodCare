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

// exports.create = function(req, res) {

//     var menuname = req.body.menuname;
//     var foodsList = req.body.foodsList;   // A list contains id of food, ex: [2, 5, 13, 18]
//     var creator = req.data.username;
    
//     const newMenu = new Menu({
//         menuname: menuname,
//         creator: creator,
//         foodsList: foodsList
//     });

//     Menu.create(newMenu, (err, menu) => {
//         if (err || (!menu)) {
//             res.status(500).json({
//                 success: false,
//                 message: "Server error",
//                 data: null
//             });
//         }

//         else {
//             res.status(200).json({
//                 success: true,
//                 message: "",
//                 data: menu
//             })
//         }
//     });


// }