const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.isLoggedin = (req, res, next) => {

    if (req.cookies.token) {

        var token = req.cookies.token;

        jwt.verify(token, process.env.JWTSECRETKEY, (err, jusername) => {
            if (err) {
                res.redirect("/login");
            }

            else {

                User.findByUsername(jusername.username, (err, user) => {
                    if (err) {
                        res.redirect("/login");
                    }

                    else if (user){
                        req.data = user;
                        next();
                    }

                    else {
                        res.redirect('/login');
                    }
                });
            }
        });

    } else {
        res.redirect('/login');
    }
}

exports.isLoggedout = (req, res, next) => {

    if (!req.cookies.token) {
        next();
    }

    else {
        var token = req.cookies.token;
        jwt.verify(token, process.env.JWTSECRETKEY, (err, jusername) => {
            if (err) {
                next();
            }

            else {

                User.findByUsername(jusername.username, (err, user) => {
                    if (err || (!user)) {
                        next();
                    }

                    else {
                        res.redirect('/');
                    }
                })
            }
        });
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.data.permission == true) {
        next();
    } else {
        res.status(500).json("CANNOT ACCESS!");
    }
}