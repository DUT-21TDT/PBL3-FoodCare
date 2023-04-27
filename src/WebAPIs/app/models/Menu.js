const mysql = require("../config/dbconnect.js");
const Food = require("../models/Food.js");

const Menu = function (menu) {
    this.menuname = menu.menuname;
    this.creator = menu.creator;

    // in database, we use table food_in_menu instead of this.foodList
    this.foodsList = menu.foodsList;
};

Menu.create = async function(newMenu) {
    try {
        const {menuname, creator} = newMenu;
        const menuData = {menuname, creator};

        const {foodsList} = newMenu;
        const foods = {foodsList};

        const detailsfoods = [];

        const mres = await mysql.query("Insert into menu set ?", menuData);


        const menuid = mres[0].insertId;


        for (const id of foods.foodsList) {
            const df = await Food.getDetailsByID(id);
            if (df) {
                detailsfoods.push(df);
            }
        }

        const values = newMenu.foodsList.map(foodid => [menuid, foodid]);

        const fres = await mysql.query("Insert into food_in_menu values ?", [values]);


        return {
            menuid: menuid,
            menuname: menuData.menuname,
            creator: menuData.creator,
            ...detailsfoods
        }
    }

    catch (err) {
        console.log("Error while creating menu: ", err);
        throw err;
    }
}


Menu.findByID = async function(id) {
    try {
        const res = await mysql.query("SELECT menuid, menuname from menu where menuid = ?", id);

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


Menu.getAllMenus = async function() {
    try {
        const res = await mysql.query("SELECT menuid, menuname from menu");

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


Menu.delete = async function(id) {
    try {
        const res = await mysql.query("delete from menu where menuid = ?", id);

        if (res[0].affectedRows) {
            return {id: id};
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while deleting menu: ", err);
        throw err;
    }
}


module.exports = Menu;