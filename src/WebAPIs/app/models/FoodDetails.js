const mysql = require("../config/dbconnect.js");

const FoodDetails = function (fooddetails) {
    this.foodid = fooddetails.foodid;
    this.energy = fooddetails.energy;
    this.water = fooddetails.water;
    this.carbohydrate = fooddetails.carbohydrate;
    this.lipid = fooddetails.lipid;
    this.protein = fooddetails.protein;
};

FoodDetails.create = function(newFoodDetails, result)
{
    mysql.query("Insert into fooddetails set ?", newFoodDetails, (err, res) => {
        if (err) {
            console.log("Error while creating nutrients: ", err);
            result(err, null);
        }

        else {
            // console.log
            result(null, newFoodDetails);
        }
    })
}

FoodDetails.delete = function(id, result) {

    mysql.query("delete from fooddetails where foodid = ?", id, (err, res) => {
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

module.exports = FoodDetails;