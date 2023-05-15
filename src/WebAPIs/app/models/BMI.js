const mysql = require("../config/mysql.connect.js");

const BMI = function(bmi) {
    this.userid = bmi.userid,
    this.weight = bmi.weight,
    this.height = bmi.height,
    this.updateTime = bmi.updateTime    // mysql format: yyyy-mm-dd time
}

// Insert a new bmi record into bmi table
// Return that record
BMI.update = async function(newBMI) {
    try {
        const res = await mysql.query("insert into bmi set ?", newBMI);

        if (res[0].affectedRows) {
            return {bmi_id: res[0].insertId, ...newBMI};
        }

        else return null;
    }

    catch (err) {
        console.log("Error while creating BMI: ", err);
        throw err;
    }
}


// Select a list of bmi records by userid
BMI.getListMeasurements = async function(userid) {
    try {
        const res = await mysql.query("select bmi_id, userid, height, weight, updateTime from bmi where userid = ? order by updateTime desc", userid);

        if (res[0].length) {
            return res[0];
        }

        else return null;
    }

    catch (err) {
        console.log("Error while finding BMI: ", err);
        throw err;
    }
}

// Select the latest bmi record updated by userid
BMI.getCurrentMeasurement = async function(userid) {
    try {
        const res = await mysql.query("select bmi_id, userid, height, weight, updateTime from bmi where userid = ? order by updateTime desc limit 1", userid);

        if (res[0].length) {
            return res[0][0];
        }

        else return null;
    }

    catch (err) {
        console.log("Error while finding BMI: ", err);
        throw err;
    }
}

// Select the limit latest bmi record by userid
BMI.getLimitMeasurements = async function(userid, lim=1) {
    try {
        const res = await mysql.query("select bmi_id, userid, height, weight, updateTime from bmi where userid = ? order by updateTime desc limit ?", [userid, Number(lim)]);

        if (res[0].length) {
            return res[0];
        }
    
        else return null;
    }

    catch (err) {
        console.log("Error while finding BMI: ", err);
        throw err;
    }
}


// delete a record through its bmi_id
// return deleted bmi_id 
BMI.delete = async function(bmi_id) {
    try {
        const res = await mysql.query("delete from bmi where bmi_id = ?", bmi_id);

        if (res[0].affectedRows) {
            return {id: bmi_id};
        }

        else return null;
    }

    catch (err) {
        console.log("Error while deleting BMI: ", err);
        throw err;
    }
}

// delete k oldest records of a user from bmi table by his userid
// default k = 1
BMI.deleteOnLimit = async function(userid, limit=1) {
    try {
        const res = await mysql.query("delete from bmi where userid = ? order by updateTime asc limit ?", [userid, limit]);

        if (res[0].affectedRows) {
            return {count: res[0].affectedRows}
        }

        else return null;
    }

    catch (err) {
        console.log("Error while deleting BMI: ", err);
        throw err;
    }
}

module.exports = BMI;