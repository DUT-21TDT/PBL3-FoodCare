const mysql = require("../config/mysql.connect.js");
const Food = require("../models/Food.js");


const Menu = function (menu) {
    this.menuname = menu.menuname;
    this.creator = menu.creator;

    // in database, we use table food_in_menu instead of this.foodList
    this.foodsList = menu.foodsList;    // foodsList: [{ foodid: foodid, amount: amount }, ...]
};

Menu.create = async function(newMenu) {
    let cn;
    try {
        const {menuname, creator} = newMenu;
        const menuData = {menuname, creator};

        const {foodsList} = newMenu;
        const foods = {foodsList};

        const detailsfoods = [];

        cn = await mysql.getConnection();

        await cn.beginTransaction();

        const mres = await cn.query("Insert into menu set ?", menuData);

        const menuid = mres[0].insertId;

        for (const food of foods.foodsList) {

            const dfi = await Food.getDetailsByID(food.foodid);
            if (dfi) {
                dfi.lastUpdate = dfi.lastUpdate.toLocaleString('en-GB');
                detailsfoods.push({details: dfi, amount: food.amount});
            }

            else {
                const fi = await Food.findByID(id);
                if (fi) {
                    detailsfoods.push({details: fi, amount: food.amount});
                }
            }
        }

        const values = newMenu.foodsList.map(food => [menuid, food.foodid, food.amount]);

        const fres = await cn.query("Insert into food_in_menu values ?", [values]);

        await cn.commit();

        return {
            menuid: menuid,
            menuname: menuData.menuname,
            creator: menuData.creator,
            foods: {
                count: detailsfoods.length,
                list: detailsfoods
            }
        }
    }

    catch (err) {
        console.log("Error while creating menu: ", err);
        throw err;
    }
}


Menu.findByID = async function(id) {
    try {
        const res = await mysql.query("SELECT menuid, menuname, creator from menu where menuid = ?", id);

        if (res[0].length) {
            return res[0][0];
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while finding menu: ", err);
        throw err;
    }
}

Menu.getDetailsByID = async function(menuid) {
    try {
        const menuinfor = await mysql.query("select menu.menuid, menu.menuname, menu.creator, food.foodname, food.foodimage, food.lastUpdate, food_in_menu.amount, fooddetails.*"
        + " from menu inner join food_in_menu on menu.menuid = food_in_menu.menuid"
        + " inner join food on food.foodid = food_in_menu.foodid"
        + " inner join fooddetails on food.foodid = fooddetails.foodid"
        + " where menu.menuid = ?", menuid);


        if (menuinfor[0].length) {

            // const foods = menuinfor[0].map(row => ({
            //     foodname: row.foodname,
            //     foodid: row.foodid,
            //     energy: row.Energy,
            //     water: row.Water,
            //     carbohydrate: row.Carbohydrate,
            //     protein: row.Protein,
            //     lipid: row.Lipid,
            // }));

            // return {
            //     menuid: menuinfor[0][0].menuid,
            //     menuname: menuinfor[0][0].menuname,
            //     creator: menuinfor[0][0].creator,
            //     foods: {
            //         count: foods.length,
            //         list: foods,
            //     },
            // }

            return menuinfor[0];
        }

        else {
            return null;
        }
        
    }

    catch (err) {
        console.log("Error while getting details of menu: ", err);
        throw err;
    }
}


Menu.getAllMenus = async function() {
    try {
        const res = await mysql.query("SELECT menuid, menuname, creator from menu");

        if (res[0].length) {
            return res[0];
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while getting list of menus: ", err);
        throw err;
    }
}

Menu.getListMenusByUserid = async function(id) {
    try {
        // const res = await mysql.query("SELECT menuid, menuname, creator from menu inner join user on creator = username where userid = ? and userid not in (select userid from user where status = false)", id);
        const res = await mysql.query("SELECT menuid, menuname, creator from menu inner join user on creator = username where userid = ?", id);

        if (res[0].length) {
            return res[0];
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while getting list of menus: ", err);
        throw err;
    }
}


// Menu.increaseFavoriteCount = async function(id) {
//     try {
//         const res = mysql.query("update menu set favoriteCount = favoriteCount + 1 where menuid = ?", id);
    
//         if (res[0].affectedRows) {
//             return {id: id};
//         }

//         else return null;
//     }

//     catch (err) {
//         console.log("Error while updating favorite's count of menu: ", err);
//         throw err;
//     }
// }

// Menu.decreaseFavoriteCount = async function(id) {
//     try {
//         const res = mysql.query("update menu set favoriteCount = favoriteCount -1 where menuid = ?", id);
     
//         if (res[0].affectedRows) {
//             return {id: id};
//         }

//         else return null;
//     }

//     catch (err) {
//         console.log("Error while updating favorite's count of menu: ", err);
//         throw err;
//     }
// }

Menu.update = async function(menuid, newMenuname, newFoodsList) {
    let cn;
    try {
        cn = await mysql.getConnection();
        cn.beginTransaction();

        await cn.query("update menu set menuname = ? where menuid = ?", [newMenuname, Number(menuid)]);
        
        await this.clearFoodsinMenu(menuid);

        const values = newFoodsList.map(food => [Number(menuid), food.foodid, food.amount]);

        await cn.query("insert into food_in_menu values ?", [values]);

        await cn.commit();

        // affectedRows = 0 => khong co su thay doi hoac khong tim thay

        return {id: menuid};

    }

    catch (err) {
        console.log("Error while updating menu: ", err);
        throw err;
    }

    finally {
        if (cn) {
            await cn.release();
        }
    }
}


Menu.clearFoodsinMenu = async function(menuid) {
    try {
        const res = await mysql.query("delete from food_in_menu where menuid = ?", menuid);
        return res[0].affectedRows;
    }

    catch (err) {
        console.log("Error while clearing food in menu: ", err);
        throw err;
    }
}


Menu.delete = async function(menuid) {
    let cn;
    try {
        cn = await mysql.getConnection();

        await cn.beginTransaction();

        await cn.query("delete from food_in_menu where menuid = ?", menuid);
        await cn.query("delete from rating where menuid = ?", menuid);
        const res = await cn.query("delete from menu where menuid = ?", menuid);

        await cn.commit();

        if (res[0].affectedRows) {
            return {id: menuid};
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while deleting menu: ", err);
        throw err;
    }

    finally {
        if (cn) {
            await cn.release();
        }
    }
}


Menu.clear = async function() {
    let cn;
    try {
        cn = await mysql.getConnection();

        await cn.beginTransaction();

        await cn.query("delete from food_in_menu");
        await cn.query("delete from rating");
        const res = await cn.query("delete from menu");

        await cn.commit();

        return {count: res[0].affectedRows};
    }

    catch (err) {
        console.log("Error while clearing menus: ", err);
        throw err;
    }

    finally {
        if (cn) {
            await cn.release();
        }
    }
}


module.exports = Menu;