const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.isLoggedin = async (req, res, next) => {
    try {
        if (!req.cookies.token) {
            res.redirect("/login");
        }

        else {
            var token = req.cookies.token;

            const jusername = jwt.verify(token, process.env.JWTSECRETKEY);

            const user = await User.findByUsername(jusername.username);

            if (user) {
                if (user.status == true) {
                    req.data = user;
                    next();
                }
                
                else {
                    res.redirect("/blocked");
                }
            }
    
            else {
                res.redirect("/login");
            }
        }  
    }

    catch (err) {
        res.redirect("/login")
    }
}


exports.isLoggedout = async (req, res, next) => {
    try {
        if (!req.cookies.token) {
            next();
        }

        else {
            var token = req.cookies.token;
            const jusername = await jwt.verify(token, process.env.JWTSECRETKEY);

            const username = await User.findByUsername(jusername.username);

            if (!username) {
                next();
            }

            else {
                res.redirect("/");
            }
        }
    }

    catch (err){
        next();
    }
}


exports.isAdmin = async (req, res, next) => {

    if (req.data.permission == true) {
        next();
    }

    else {
        res.status(401).json("CANNOT ACCESS!")
    }
}

// exports.isAdmin = (req, res, next) => {
//     if (req.data.permission == true) {
//         next();
//     } else {
//         res.status(500).json("CANNOT ACCESS!");
//     }
// }