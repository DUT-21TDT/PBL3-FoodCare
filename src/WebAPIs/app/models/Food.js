const mysql = require("../config/dbconnect.js");

const Food = function (food) {
    this.foodname = food.foodname;
};

Food.create = async function(newFood) {
    try {
        const res = await mysql.query("Insert into food set ?", newFood);
        return {foodid: res[0].insertId, ...newFood};
    }

    catch (err) {
        console.log("Error while creating food: ", err);
        throw err;
    }
}


Food.findByID = async function(id)
{
    try {
        const res = await mysql.query("select foodid, foodname from food where foodid = ?", id);

        if (res[0].length == 0) {
            return null;
        }

        return res[0][0];
    }

    catch (err) {
        console.log("Error while finding food: ", err);
        throw err;
    }
}


Food.getAllFoods = async function() {
    try {
        const res = await mysql.query("select foodid, foodname from food");

        if (res[0].length == 0) {
            return null;
        }

        else {
            return res[0];
        }
    }

    catch (err) {
        console.log("Error while getting list of foods: ", err);
        throw err;
    }
}

Food.getDetailsByID = async function(id) {
    try {
        const res = await mysql.query("SELECT food.foodid, food.foodname, fooddetails.energy, fooddetails.water, fooddetails.carbohydrate, fooddetails.protein, fooddetails.lipid " +
        "FROM food INNER JOIN fooddetails " +
        "ON food.foodid = fooddetails.foodid " + 
        "WHERE food.foodid = ?", id);

        if (res[0].length) {
            return res[0][0];
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while showing details of food: ", err);
        throw err;
    }
}


Food.delete = async function(id) {
    try {
        const res = await mysql.query("delete from food where food.foodid = ?", id);

        if (res[0].affectedRows == 0) {
            return null;
        } 

        else {
            return {id: id};
        }
    }

    catch (err) {
        console.log("Error while deleting food: ", err);
        throw err;
    }
}


module.exports = Food;