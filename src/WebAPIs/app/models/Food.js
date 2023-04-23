const mysql = require("../config/dbconnect.js");

const Food = function (food) {
    this.foodname = food.foodname;
};

Food.create = function(newFood, result) {
    mysql.query("Insert into food set ?", newFood, (err, res) => {
        if (err) {
            console.log("Error while creating food: ", err);
            result(err, null);
        }
        
        else {
            // console.log("")
            result(null, {foodid: res.insertId, ...newFood});
        }
    })
}

Food.findByID = function(id, result) {
    mysql.query("select * from food where foodid = ?", id, (err, res) => {

        if (err) {
            console.log("Error while finding food: ", err);
            result(err, null);
        }

        else if (res.length == 0) {
            result(null, null);
        }

        else {
            result(null, res[0]);
        }
    })
}

Food.getAllFoods = function(result) {
    mysql.query("select * from food", (err, res) => {
        if (err) {
            console.log("Error while getting list of foods: ", err);
        }

        else if (res.length == 0) {
            result(null, null);
        }

        else {
            result(null, res);
        }
    })
}

Food.showDetailsByID = function(id, result) {
    mysql.query("select food.foodid, food.foodname, fooddetails.energy, fooddetails.water, fooddetails.carbohydrate, fooddetails.protein, fooddetails.lipid " +
        "from food inner join fooddetails " +
        "on food.foodid = fooddetails.foodid " + 
        "where food.foodid = ?", id, (err, res) => {
            if (err) {
                console.log("Error while showing details of food: ", err);
                result(err, null);
            }

            else if (res.length == 0) {
                result(null, null);
            }

            else {
                result(null, res[0]);
            }
        })
}

Food.delete = function(id, result) {

    mysql.query("delete from food where food.foodid = ?", id, (err, res) => {
        if (err) {
            console.log("Error while deleting data: ", err);
            result(err, null);
        }

        else if (res.affectedRows == 0) {
            result(null, null);
        }

        else {
            result(null, {id: id});
        }
    });
}

module.exports = Food;