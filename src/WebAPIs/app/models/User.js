const mysql = require("../config/mysql.connect.js");
// const bcrypt = require("bcrypt");

const User = function (user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.status = user.status;
    this.permission = user.permission;
    this.name = user.name;
    this.dateofbirth = user.dateofbirth;  // yyyy-mm-dd
    this.gender = user.gender;
    this.avatar = user.avatar;
    this.createTime = user.createTime;
};

User.create = async function(newUser) {
    try {
        const res = await mysql.query("Insert into user set ?", newUser);

        if (res[0].affectedRows) {
            return {userid: res[0].insertId, ...newUser};
        }

        else return null;
    }

    catch (err) {
        console.log("Error while creating user: ", err);
        throw err;
    }
}


User.getAllUsers = async function() {
    try{
        const res = await mysql.query("select userid, username, email, password, status, permission, name, dateofbirth, gender, avatar, createTime from user");

        if (res[0].length) {
            return res[0];
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


User.findByID = async function(id) {
    try {
        const res = await mysql.query("select userid, username, email, password, status, permission, name, avatar, dateofbirth, gender, createTime from user where userid = ?", id);
        
        if (res[0].length) {
            return res[0][0];
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


User.findByUsername = async function(username) {
    try {
        const res = await mysql.query("select userid, username, email, password, status, permission, name, avatar, dateofbirth, gender, createTime from user where username = ?", username);
        
        if (res[0].length) {
            return res[0][0];
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


User.findByEmail = async function(email) {
    try {
        const res = await mysql.query("select userid, username, email, password, status, permission, name, avatar, dateofbirth, gender, createTime from user where email = ?", email);
        
        if (res[0].length) {
            return res[0][0];
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
        const res = await mysql.query("update user set permission = not permission where userid = ?", id);

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
        const res = await mysql.query("update user set password = ? where userid = ?", [newPassword, id]);

        if (res[0].affectedRows) {
            return {id: id};
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while changing password: ", err);
        throw err;
    }
}


User.uploadAvatar = async function(id, imageUrl) {
    try {
        const res = await mysql.query("update user set avatar = ? where userid = ?", [imageUrl, id]);

        if (res[0].affectedRows) {
            return {url: imageUrl};
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while updating avatar: ", err);
        throw err;
    }
}


User.updateProfile = async function(id, newName, newBirthday, newGender) {
    try {
        const res = await mysql.query("update user set name = ?, dateofbirth = ?, gender = ? where userid = ?", [newName, newBirthday, newGender, id]);
    
        if (res[0].affectedRows) {
            return {id: id};
        }

        else {
            return null;
        }
    }

    catch (err) {
        console.log("Error while updating profile: ", err);
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
