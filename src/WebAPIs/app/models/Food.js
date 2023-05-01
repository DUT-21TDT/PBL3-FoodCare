const mysql = require("../config/dbconnect.js");

const Food = function (food) {
    this.foodname = food.foodname;
    this.foodimage = food.foodimage;
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


Food.uploadImage = async function(image) {
    try {

    }

    catch (err) {
        
    }
}


Food.delete = async function(id) {
    let cn;
    try {
        cn = await mysql.getConnection();

        await cn.beginTransaction();

        await cn.query("delete from food_in_menu where foodid = ?", id);
        await cn.query("delete from fooddetails where foodid = ?", id);
        const res = await cn.query("delete from food where food.foodid = ?", id);

        await cn.commit();

        if (res[0].affectedRows) {
            return {id: id};
        } 

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while deleting food: ", err);
        throw err;
    }
    
    finally {
        if (cn) {
            await cn.release();
        }
    }
}

Food.clear = async function() {
    let cn;
    try {
        cn = await mysql.getConnection();

        await cn.beginTransaction();

        await cn.query("delete from food_in_menu where foodid in (select foodid from food)");
        await cn.query("delete from fooddetails where foodid in (select foodid from food)");
        const res = await cn.query("delete from food");

        await cn.commit();

        return {count: res[0].affectedRows};
    }

    catch (err) {
        console.log("Error while clearing foods: ", err);
        throw err;
    }

    finally {
        if (cn) {
            await cn.release();
        }
    }
}


module.exports = Food;