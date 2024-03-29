const User = require("../models/User.js");
// const validator = require("validator");
const emailValidator = require("deep-email-validator");
// const bcrypt = require("bcrypt");

exports.checkFormatUsername = checkFormatUsername;
exports.checkExistUsername = checkExistUsername;
exports.checkFormatEmail = checkFormatEmail;
exports.checkExistEmail = checkExistEmail;
// exports.checkValidPassword = checkValidPassword;

async function checkFormatUsername(username) {
    try {
        if (!username) {
            return false;
        }
    
        if (username.length < 3) {
            return false;
        }

        const regex = /^[a-zA-Z0-9_]+$/;
        return regex.test(username);
    } 
    
    catch (error) {
        throw error;
    }
}

async function checkExistUsername(username) {
    try {
        if (!username) {
            return null;
        }
    
        const user = await User.findByUsername(username);
    
        if (user) {
            return user;
        }
    
        else {
            return null;
        }
    } 
    
    catch (error) {
        throw error;
    }

}

async function checkFormatEmail(email) {
    try {
        if (!email) {
            return false;
        }

        const {valid} = await emailValidator.validate(email);
    
        return valid;
    }

    catch (err) {
        throw err;
    }
}

async function checkExistEmail(email) {
    try {
        if (!email) {
            return null;
        }
    
        const user = await User.findByEmail(email);
    
        if (user) {
            return user;
        }
    
        else {
            return null;
        }
    } 
    
    catch (error) {
        throw error;
    }

}

// async function checkValidPassword(password) {

// }