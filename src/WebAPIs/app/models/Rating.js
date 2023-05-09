const mysql = require("../config/dbconnect.js");

const Rating = function(rating) {
    this.userid = rating.userid,        // int
    this.menuid = rating.menuid,        // int
    this.favorite = rating.favorite,    // bool ---- Add to favorite menus list
    this.comment = rating.comment,      // text
    this.postTime = rating.postTime     // datetime
    // this.visible = rating.visible      // bool
}

Rating.create = async function(newRating) {
    try {
        const res = await mysql.query("insert into rating set ?", newRating);

        if (res[0].affectedRows) {
            return {ratingid: res[0].insertId, ...newRating};
        }

        else return null;
    }

    catch (err) {
        console.log("Error while creating BMI: ", err);
        throw err;
    }
}

Rating.getListRatingsByMenuid = async function(menuid) {
    try {
        // const res = await mysql.query("select ratingid, userid, favorite, comment, postTime from rating where menuid = ? and userid not in (select userid from user where status = false)", menuid);
        const res = await mysql.query("select ratingid, userid, favorite, comment, postTime from rating where menuid = ?", menuid);

        if (res[0].length) {
            return res[0];
        }

        else return null;
    }

    catch (err) {
        console.log("Error while getting rating list: ", err);
        throw err;
    }
}

Rating.getRatingByRatingid = async function(ratingid) {
    try {
        // const res = await mysql.query("select ratingid, userid, favorite, comment, postTime from rating where ratingid = ? and userid not in (select userid from user where status = false)", ratingid);
        const res = await mysql.query("select ratingid, userid, favorite, comment, postTime from rating where ratingid = ?", ratingid);

        if (res[0].length) {
            return res[0][0];
        }

        else return null;
    }

    catch (err) {
        console.log("Error while getting rating: ", err);
        throw err;
    }
}


Rating.getFavoriteCount = async function(menuid) {
    try {
        // const res = await mysql.query("select count(userid) from rating where menuid = ? and favorite = true and userid not in (select userid from user where status = false)", menuid);
        const res = await mysql.query("select count(userid) from rating where menuid = ? and favorite = true", menuid);

        return res[0][0]['count(userid)'];
    }

    catch (err) {
        console.log("Error while getting favorite count of menu: ", err);
        throw err;
    }
}


// Rating.update = async function(favorite, comment) {
//     try {

//     }

//     catch (err) {

//     }
// }

Rating.delete = async function(ratingid) {
    try {
        const res = await mysql.query("delete from rating where ratingid = ?", ratingid);

        if (res[0].affectedRows) {
            return {id: ratingid};
        }

        else return null;
    }

    catch (err) {
        console.log("Error while deleting rating: ", err);
        throw err;
    }
}

module.exports = Rating;