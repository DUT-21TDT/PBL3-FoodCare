const mysql = require("../config/dbconnect.js");

const FoodDetails = function (fooddetails) {
    this.foodid = fooddetails.foodid;
    this.energy = fooddetails.energy;
    this.water = fooddetails.water;
    this.carbohydrate = fooddetails.carbohydrate;
    this.lipid = fooddetails.lipid;
    this.protein = fooddetails.protein;
};

FoodDetails.create = async function(newFoodDetails) {
    try {
        await mysql.query("Insert into fooddetails set ?", newFoodDetails);

        return newFoodDetails;
    }

    catch (err) {
        console.log("Error while creating nutrients: ", err);
        throw err;
    }
}


FoodDetails.delete = async function (id) {
    try {
        const res = await mysql.query("delete from fooddetails where foodid = ?", id);

        if (res[0].affectedRows == 0) {
            return null;
        } 

        else {
            return {id: id}
        }
    } 

    catch (err) {
        console.log("Error while deleting data: ", err);
        throw err;
    }
}


module.exports = FoodDetails;