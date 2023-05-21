const Menu = require("../models/Menu.js");
const Rating = require("../models/Rating.js");


//#region CREATE

async function createMenu(req, res, next) {
    try {
        var menuName = req.body.menuName;
        var menuImage = req.body.menuImage;
        var foodsList = req.body.foodsList;
        var creator = req.data.username;
        var privacy = (req.data.permission===1) ? 1 : 0;    // default

        // menuname and creator field is required
        if ((!menuName) || (!creator)) {
            res.status(400).json({
                success: false,
                message: "Null input error",
                data: null
            })

            return;
        }
        
        const newMenu = new Menu({
            menuname: menuName,
            menuimage: menuImage,
            creator: creator,
            foodsList: foodsList,
            privacy: privacy,
        });

        const menu = await Menu.create(newMenu);

        if (menu) {
            res.status(200).json({
                success: true,
                message: "Create menu successfully",
                data: menu
            });

            req.username = req.data.username;
            req.action = `Create menu #${menu.menuid}`;
            next();
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

async function getAllPublicMenus(req, res, next) {
    try {
        let menusList = null;
        const userid = req.query.userid;
        
        if (!userid){
            menusList = await Menu.getAllPublicMenus();
        } else {
            menusList = await Menu.getListMenusByUserid(userid);
        }
        

        if (menusList) {

            let menulist = [];

            for (const m of menusList) {
                const details = await Menu.getDetailsByID(m.menuid);
                const favoriteCount = await Rating.getFavoriteCount(m.menuid);

                const foods = details.map(function(row) {
                    return {
                        foodid: row.foodid,
                        amount: row.amount
                    }
                });
                
                const _menu = {
                    menuid: m.menuid,
                    menuname: m.menuname,
                    menuimage: m.menuimage,
                    creator: m.creator,
                    privacy: m.privacy,
                    favoriteCount: favoriteCount,
                    foods: foods,
                }

                menulist.push(_menu);
            }

            res.status(200).json({
                success: true,
                message: "Get list of menus successfully",
                data: {
                    count: menulist.length,
                    list: menulist,
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

async function getAllPendingMenus(req, res, next) {
    try {
        const menusList = await Menu.getAllPendingMenus();

        if (menusList) {

            let menulist = [];

            for (const m of menusList) {
                const details = await Menu.getDetailsByID(m.menuid);

                const foods = details.map(function(row) {
                    return {
                        foodid: row.foodid,
                        amount: row.amount
                    }
                });
                
                const _menu = {
                    menuid: m.menuid,
                    menuname: m.menuname,
                    menuimage: m.menuimage,
                    creator: m.creator,
                    privacy: m.privacy,
                    foods: foods,
                }

                menulist.push(_menu);
            }

            res.status(200).json({
                success: true,
                message: "Get list of menus successfully",
                data: {
                    count: menulist.length,
                    list: menulist,
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

async function getOwnMenus(req, res, next) {
    try {
        var userid = req.data.userid;

        const menusList = await Menu.getListMenusByUserid(userid);

        if (menusList) {

            let menulist = [];

            for (const m of menusList) {
                const details = await Menu.getDetailsByID(m.menuid);
                const favoriteCount = await Rating.getFavoriteCount(m.menuid);
                const foods = details.map(function(row) {
                    return {
                        foodid: row.foodid,
                        amount: row.amount
                    }
                });
                
                const _menu = {
                    menuid: m.menuid,
                    menuname: m.menuname,
                    menuimage: m.menuimage,
                    creator: m.creator,
                    privacy: m.privacy,
                    favoriteCount: favoriteCount,
                    foods: foods,
                }

                menulist.push(_menu);
            }

            res.status(200).json({
                success: true,
                message: `Get list of menus of user #${userid} successfully`,
                data: {
                    count: menulist.length,
                    list: menulist
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
async function getMenusByUserid(req, res, next) {
    try {
        var userid = req.params.userid;

        let menusList;

        if (req.data && req.data.permission == 1)
            menusList = await Menu.getListMenusByUserid(userid);

        else if (req.data && req.data.permission == 0)
            menusList = await Menu.getListPublicMenusByUserid(userid);

        else {
            res.status(403).json({
                success: false,
                message: "No permission",
                data: null
            });
            return;
        }

        if (menusList) {


            let menulist = [];

            for (const m of menusList) {
                const details = await Menu.getDetailsByID(m.menuid);
                const favoriteCount = await Rating.getFavoriteCount(m.menuid);
                const foods = details.map(function(row) {
                    return {
                        foodid: row.foodid,
                        amount: row.amount
                    }
                });
                
                const _menu = {
                    menuid: m.menuid,
                    menuname: m.menuname,
                    menuimage: m.menuimage,
                    creator: m.creator,
                    privacy: m.privacy,
                    favoriteCount: favoriteCount,
                    foods: foods,
                }

                menulist.push(_menu);
            }
            
            res.status(200).json({
                success: true,
                message: `Get list of menus of user #${userid} successfully`,
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

async function getAllAccessibleMenus(req, res, next) {
    try {
        let menusList;
        // Neu la admin thi lay pending list + public list + own menu
        if (req.data && req.data.permission == 1)
            menusList = await Menu.getListAccessibleByUserid(req.data.userid, 0);

        // User khong co quyen truy cap pending list
        else if (req.data && req.data.permission == 0)
            menusList = await Menu.getListAccessibleByUserid(req.data.userid, 1);

        else {
            res.status(403).json({
                success: false,
                message: "No permission",
                data: null
            });
            return;
        }

        if (menusList) {


            let menulist = [];

            for (const m of menusList) {
                const details = await Menu.getDetailsByID(m.menuid);
                const favoriteCount = await Rating.getFavoriteCount(m.menuid);
                const foods = details.map(function(row) {
                    return {
                        foodid: row.foodid,
                        amount: row.amount
                    }
                });
                
                

                const _menu = {
                    menuid: m.menuid,
                    menuname: m.menuname,
                    menuimage: m.menuimage,
                    creator: m.creator,
                    privacy: m.privacy,
                    favoriteCount: favoriteCount,
                    foods: foods,
                }

                // console.log(_menu);

                menulist.push(_menu);
            }

            res.status(200).json({
                success: true,
                message: `Get accessible list of menus of user #${req.data.userid} successfully`,
                data: {
                    count: menulist.length,
                    list: menulist
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

async function getDetailsByMenuid(req, res, next) {
    try {
        var menuid = req.params.menuid;

        const menudetails = await Menu.getDetailsByID(menuid);  // a list

        if (menudetails) {

            const favoriteCount = await Rating.getFavoriteCount(menuid);

            if (menudetails[0].privacy == 2 || (req.data && req.data.permission == true) || (req.data && req.data.username == menudetails[0].menuname)) {
                const foods = menudetails.map(function(row) {
                    return {
                        foodid: row.foodid,
                        amount: row.amount
                    }
                });
    
                // console.log(foods);
    
                const i_menudetails = {
                    menuid: menudetails[0].menuid,
                    menuname: menudetails[0].menuname,
                    menuImage: menudetails[0].menuimage,
                    creator: menudetails[0].creator,
                    privacy: menudetails[0].privacy,
                    favoriteCount: favoriteCount,
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
                res.status(403).json({
                    success: false,
                    message: "No permission",
                    data: null
                });
            }
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


async function getFavoriteCount(req, res, next) {
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

async function updateMenu(req, res, next) {
    try {
        var menuid = req.params.menuid;
        var newMenuname = req.body.menuName;
        var newFoodsList = req.body.foodsList;

        const menu = await Menu.findByID(menuid);

        if (!menu) {
            res.status(404).json({
                success: false,
                message: "Menu not found"
            });
            return;
        }

        else {

            if (!req.data || req.data.username != menu.creator) {
                res.status(403).json({
                    success: false,
                    message: "No permission",
                });
                return;
            }

            await Menu.update(menuid, newMenuname, newFoodsList);

            res.status(200).json({
                success: true,
                message: `Update menu #${menuid} successfully`,
            });
        
            req.username = req.data.username;
            req.action = `Update menu #${menuid}`;
            next();
        }


    }

    catch (err) {
        res.status(500).json({
            success: false, 
            message: "Server error: " + err.message, 
        });
    }
}

async function proposeMenu(req, res, next) {
    try {
        var menuid = req.params.menuid;

        const menu = await Menu.findByID(menuid);

        if (menu) {
            if (menu.creator == req.data.username && menu.privacy == 0) {

                await Menu.updatePrivacy(menuid, 1);

                res.status(200).json({
                    success: true,
                    message: `Propose menu #${menuid} successfully`,
                });
            
                req.username = req.data.username;
                req.action = `Propose menu #${menuid}`;
                next();
            }

            else {
                res.status(403).json({
                    success: false,
                    message: `Cannot propose menu: menu not permitted`
                });
            }
        }

        else {
            res.status(404).json({
                success: false,
                message: `Menu not found`,
            });
        }
    } 
    
    catch (err) {
        res.status(500).json({
            success: false, 
            message: "Server error: " + err.message, 
        });
    }
}

async function approveMenu(req, res, next) {
    try {
        const menuid = req.params.menuid;
        const menu = await Menu.findByID(menuid);
        
        if (menu) {
            console.log(menu);
            if (menu.privacy == 1) {

                await Menu.updatePrivacy(menuid, 2);

                res.status(200).json({
                    success: true,
                    message: `Approve menu #${menuid} successfully`,
                });
            
                req.username = req.data.username;
                req.action = `Approve menu #${menuid}`;
                next();
            } else if (menu.privacy == 2) {

                await Menu.updatePrivacy(menuid, 1);

                res.status(200).json({
                    success: true,
                    message: `set menu #${menuid} to pending successfully`,
                });
            
                req.username = req.data.username;
                req.action = `set pending menu #${menuid}`;
                next();
            }

            else {
                res.status(403).json({
                    success: false,
                    message: `Cannot approve menu: menu not permitted`
                });
            }
        }

        else {
            res.status(404).json({
                success: false,
                message: `Menu not found`,
            });
        }
    } 
    
    catch (err) {
        res.status(500).json({
            success: false, 
            message: "Server error: " + err.message, 
        });
    }
}

async function declineMenu(req, res, next) {
    try {
        var menuid = req.params.menuid;

        const menu = await Menu.findByID(menuid);
        
        if (menu) {
            if (menu.privacy == 1) {

                await Menu.updatePrivacy(menuid, 0);

                res.status(200).json({
                    success: true,
                    message: `Decline menu #${menuid} successfully`,
                });
            
                req.username = req.data.username;
                req.action = `Decline menu #${menuid}`;
                next();
            }

            else {
                res.status(403).json({
                    success: false,
                    message: `Cannot approve menu: menu not permitted`
                });
            }
        }

        else {
            res.status(404).json({
                success: false,
                message: `Menu not found`,
            });
        }
    } 
    
    catch (err) {
        res.status(500).json({
            success: false, 
            message: "Server error: " + err.message, 
        });
    }
}

//#endregion

//#region DELETE

async function remove(req, res, next) {
    try {
        var menuid = req.params.menuid;

        const menu = await Menu.findByID(menuid);

        if (!menu) {
            res.status(404).json({
                success: false,
                message: "Menu not found"
            });
            return;
        }

        else {

            if (!req.data || (req.data.username != menu.creator && req.data.permission != true)) {
                res.status(403).json({
                    success: false,
                    message: "No permission",
                });
                return;
            }

            const mid = await Menu.delete(menuid);

            if (mid) {
                res.status(200).json({
                    success: true,
                    message: `Delete menu #${mid.id} successfully`,
                });
            }

            else {
                res.status(404).json({
                    success: false,
                    message: "Menu not found",
                });
            }

            req.username = req.data.username;
            req.action = `Delete menu #${menuid}`;
            next();
        }

        
    }

    catch (err) {
        res.status(500).json({
            success: false, 
            message: "Server error: " + err.message, 
        });
    }
}

async function clear(req, res, next) {
    try {
        const count = await Menu.clear();

        res.status(200).json({
            success: true,
            message: "Clear all menus successfully",
            data: count
        });

        req.username = req.data.username;
        req.action = `Clear menus`;
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

//#endregion

module.exports = {
    createMenu,
    getAllPublicMenus,
    getAllPendingMenus,
    getOwnMenus,
    getMenusByUserid,
    getAllAccessibleMenus,
    getDetailsByMenuid,
    getFavoriteCount,
    updateMenu,
    proposeMenu,
    declineMenu,
    approveMenu,
    remove,
};