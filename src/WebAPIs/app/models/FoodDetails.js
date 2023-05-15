const mysql = require("../config/mysql.connect.js");

const FoodDetails = function (fooddetails) {
    this.foodid = fooddetails.foodid;               // FK not null
    this.energy = fooddetails.energy;
    this.water = fooddetails.water;
    this.carbohydrate = fooddetails.carbohydrate;
    this.lipid = fooddetails.lipid;
    this.protein = fooddetails.protein;
    this.vitamins = fooddetails.vitamins;
    this.minerals = fooddetails.minerals;
};

FoodDetails.create = async function(newFoodDetails) {
    try {
        const res = await mysql.query("Insert into fooddetails set ?", newFoodDetails);

        if (res[0].affectedRows) {
            return newFoodDetails;
        }
        
        else return null;
    }

    catch (err) {
        console.log("Error while creating nutrients: ", err);
        throw err;
    }
}


FoodDetails.update = async function(foodid, newFoodDetails) {
    try {
        const res = await mysql.query("update fooddetails set ? where foodid = ?", [newFoodDetails, foodid]);

        if (res[0].affectedRows) {
            return res[0].affectedRows;
        }
        
        else return null;
    }

    catch (err) {
        console.log("Error while updating nutrients: ", err);
        throw err;
    }
}


FoodDetails.delete = async function (id) {
    try {
        const res = await mysql.query("delete from fooddetails where foodid = ?", id);

        if (res[0].affectedRows) {
            return {id: id};
        } 

        else {
            return null;
        }
    } 

    catch (err) {
        console.log("Error while deleting data: ", err);
        throw err;
    }
}

module.exports = FoodDetails;