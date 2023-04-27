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

User.create = async function(newUser) {
    try {
        const res = await mysql.query("Insert into user set ?", newUser);

        return {userid: res.insertId, ...newUser};
    }

    catch (err) {
        console.log("Error while creating user: ", err);
        throw err;
    }
}


User.getAllUsers = async function() {
    try{
        const res = await mysql.query("select userid, username, password, status, permission, name, birthday, gender from user");

        if (res[0].length) {

            const users = [];

            for (const user of res[0]) {
                const i_user = new User({
                    username: user.username,
                    password: user.password,
                    status: user.status,
                    permission: user.permission,
                    name: user.name,
                    birthday: user.birthday.toLocaleDateString().split("/").reverse().join("-"),
                    gender: user.gender,
                });

                users.push({userid: user.userid,...i_user});
            }

            return users;
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while getting all users: ", err);
        throw err;
    }
}


User.findByUsername = async function(username) {
    try {
        const res = await mysql.query("select userid, username, password, status, permission, name, birthday, gender from user where username = ?", username);
        
        if (res[0].length) {

            const user = new User({
                username: res[0][0].username,
                password: res[0][0].password,
                status: res[0][0].status,
                permission: res[0][0].permission,
                name: res[0][0].name,
                birthday: res[0][0].birthday.toLocaleDateString().split("/").reverse().join("-"),
                gender: res[0][0].gender,
            });

            return user;
        }

        else {
            return null;
        }
    }

    catch (err){
        console.log("Error while finding user: ", err);
        throw err;
    }
}


User.findByID = async function(id) {
    try {
        const res = await mysql.query("select userid, username, password, status, permission, name, birthday, gender from user where userid = ?", id);
        
        if (res[0].length) {

            const user = new User({
                username: res[0][0].username,
                password: res[0][0].password,
                status: res[0][0].status,
                permission: res[0][0].permission,
                name: res[0][0].name,
                birthday: res[0][0].birthday.toLocaleDateString().split("/").reverse().join("-"),
                gender: res[0][0].gender,
            });

            return user;
        }

        else {
            return null;
        }
    }

    catch (err){
        console.log("Error while finding user: ", err);
        throw err;
    }
}


User.changePermission = async function(id) {
    try {
        const res = await mysql.query("update user set permission = not permiossion where userid = ?", id);

        if (res[0].affectedRows) {
            return {id: id};
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while changing data");
        throw err;
    }
}

User.changeStatus = async function(id) {
    try {
        const res = await mysql.query("update user set status = not status where userid = ?", id);

        if (res[0].affectedRows) {
            return {id, id};
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while changing data: ", err)
        throw err;
    }
}


User.changePassword = async function(id, newPassword) {
    try {
        const res = await mysql.query("update user set password = ? where userid = ?", id);

        if (res[0].affectedRows) {
            return {id: id};
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while changing data: ", err);
        throw err;
    }
}


User.delete = async function(id) {
    try {
        const res = await mysql("delete from user where userid = ?", id);

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


module.exports = User;
