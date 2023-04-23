const mysql = require("../config/dbconnect.js");
// const bcrypt = require("bcrypt");

const User = function (user) {
    this.username = user.username;
    this.password = user.password;
    this.status = user.status;
    this.permission = user.permission;
    this.name = user.name;
    this.birthday = user.birthday;
    this.gender = user.gender;
};

User.create = function (newUser, result) {

    mysql.query("Insert into user SET ?", newUser, (err, res) => {

        if (err) {
            console.log("Error while creating user: ", err);
            result(err, null);
            // throw err;
        } 
        
        else {
            console.log("Created user: ", {id: res.insertId, ...newUser,});
            result(null, { userid: res.insertId, ...newUser });
        }
    });
};

User.getAllUsers = function (result) {

    mysql.query("select * from user", (err, res) => {

        if (err) {
            console.log("Error while getting all users: ", err);
            result(err, null);
        }
        
        else if (res.length == 0) {
            result(null, null);
        } 
        
        else {
            result(null, res);
        }
    });
};

User.findByUsername = function (username, result) {

    mysql.query("select * from user where user.username = ?", username, (err, res) => {

        if (err) {
            console.log("Error while finding user: ", err);
            result(err, null);
        } 
        
        else if (res.length == 0) {
            result(null, null);
        } 
        
        else {

            const user = new User({
                username: res[0].username,
                password: res[0].password,
                status: res[0].status,
                permission: res[0].permission,
                name: res[0].name,
                birthday: res[0].birthday.toLocaleDateString().split("/").reverse().join("-"),
                gender: res[0].gender,
            });

        result(null, { userid: res[0].userid, ...user });

        }
    });
};

User.findById = function (id, result) {

    mysql.query("select * from user where user.userid = ?", id, (err, res) => {

        if (err) {
            console.log("Error while finding user: ", err);
            result(err, null);
        } 
        
        else if (res.length == 0) {
            result(null, null);
        } 
        
        else {

            const user = new User({
                username: res[0].username,
                password: res[0].password,
                status: res[0].status,
                permission: res[0].permission,
                name: res[0].name,
                birthday: res[0].birthday.toLocaleDateString().split("/").reverse().join("-"),
                gender: res[0].gender,
            });

        result(null, { userid: res[0].userid, ...user });

        }
    });
};

User.changePermission = function (id, result) {

        mysql.query("update user set user.permission = not user.permission where user.userid = ?", id, (err, res) => {
            if (err) {
                console.log("Error while changing data");
                result(err, null);
            }

            else if (res.affectedRows == 0) {
                result(null, null)
            }

            else {
                result(null, {id : id});
            }
        });
};

User.changeStatus = function (id, result) {

        mysql.query("update user set user.status = not user.status where user.userid = ?", id, (err, res) => {
            if (err) {
                console.log("Error while changing data: ", err);
                result(err, null);
            }

            else if (res.affectedRows == 0) {
                result(null, null);
            }

            else {
                result(null, {id : id});
            }

        });
};

User.changePassword = function(id, newPassword, result) {



    mysql.query("update user set user.password = ? where user.userid = ?", [newPassword, id], (err, res) => {
        if (err) { 
            console.log("Error while changing data: ", err);
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

User.delete = function(id, result) {

    mysql.query("delete from user where user.userid = ?", id, (err, res) => {
        if (err) {
            console.log("Error while deleting data: ", err);
            result(err, null);
        }

        else if (res.affectedRows == 0) {
            result(null, null);
        }

        else {
            result(null, {id, id});
        }
    });
}

    // this.findByUsername(username, (err, user) => {

    //     if (err) {
    //         result(err, null);
    //     }

    //     if (user) {

    //         mysql.query("update user set user.permission = ? where user.username = ?", [(!user.permission), username], (err, res) => {
    //             if (err) {
    //                 console.log("Error while changing permission.");
    //                 result(err, null);
    //             }

    //             else {
    //                 result(null, user);
    //             }
    //         })
    //     }
    // })



module.exports = User;
