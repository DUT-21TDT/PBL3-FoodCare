const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv/config");

exports.login = function (req, res) {
    
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.status(401).json({ message: "null input" });
    }

    User.findByUsername(username, (err, user) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: "Server error",
                data: null,
                token: null,
            });
        }

        if (!user) {
            res.status(401).json({
                status: false,
                message: "Username not found",
                data: null,
                token: null,
            });
        } 
    
        else {
            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (passwordIsValid) {
                const token = jwt.sign({ username: user.username }, process.env.JWTSECRETKEY, { expiresIn: 7200 });

                res.cookie('token', token);

                console.log(req.cookies.token);

                res.status(200).json({
                    status: true,
                    message: "Login successfully",
                    data: user,
                    token: token,
                });
            } 
      
            else {
                res.status(401).json({
                    status: false,
                    message: "Wrong password",
                    data: null,
                    oken: null,
                });
            }
        }   
    });
};

exports.register = function (req, res) {

    var username = req.body.username;
    var password = req.body.password;
    var status = true;
    var permission = false;
    var name = req.body.name;
    var birthday = req.body.birthday.split("/").reverse().join("-");
    var gender = req.body.gender;

    User.findByUsername(username, (err, user) => {
        if (err) {
            res.status(500).json({ status: false, message: "Server error", data: null });
            return;
        }

        if (user) {
            res.status(401).json({ status: false, message: "Username is already taken", data: null });
        } 
    
        else {
            bcrypt.hash(password, parseInt(process.env.BCRYPTKEY)).then((hashedpw) => {

                const newUser = new User({
                    username: username,
                    password: hashedpw,
                    status: status,
                    permission: permission,
                    name: name,
                    birthday: birthday,
                    gender: gender,
                });

                User.create(newUser, (err, user) => {
                    if (err) {
                        res.status(500).json({ status: false, message: "Server error" });
                        return;
                    }

                    res.status(200).json({
                        status: true,
                        message: "Register successfully",
                        data: user,
                    });
            // res.redirect("/login");
                });
            });
        }
    });
}

exports.logout = function (req, res) {
    res.clearCookie('token');
    res.json({status: true, message: 'Logout successfully'});
}