const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv/config");

exports.login = async function(req, res) {
    try {
        var username = req.body.username;
        var password = req.body.password;

        if ((!username) || (!password)) {
            res.status(401).json({
                success: false,
                message: "Null input",
                data: null
            });

            return;
        }

        const user = await User.findByUsername(username);

        if (user) {

            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (passwordIsValid) {
                
                const token = jwt.sign({ username: user.username }, process.env.JWTSECRETKEY, { expiresIn: 7200 });

                res.cookie('token', token);

                res.status(200).json({
                    success: true,
                    message: "Login successfully",
                    data: user,
                    token: token,
                });
            } 
      
            else {
                res.status(401).json({
                    success: false,
                    message: "Wrong password",
                    data: null,
                    token: null,
                });
            }
        }

        else {
            res.status(401).json({
                success: false,
                message: "Username not found",
                data: null,
                token: null,
            });
        }
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
            data: null,
            token: null,
        });
    }
}

exports.register = async function(req, res) {
    try {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var status = true;
        var permission = false;
        var name = req.body.name;
        var birthday = req.body.birthday;
        var gender = req.body.gender;

        var user = await User.findByUsername(username);

        if (user) {
            res.status(401).json({ success: false, message: "Username is already taken", data: null });
            return;
        }

        else {
            user = await User.findByEmail(email);

            if (user) {
                res.status(401).json({ success: false, message: "Email is already taken", data: null });
                return;
            }

            else {
                const hashedpw = await bcrypt.hash(password, parseInt(process.env.BCRYPTKEY));

                const newUser = new User({
                    username: username,
                    password: hashedpw,
                    email: email,
                    status: status,
                    permission: permission,
                    name: name,
                    birthday: birthday.split("/").reverse().join("-"),
                    gender: gender,
                    avatar: null,
                });

                user = await User.create(newUser);
                console.log(user.birthday);

                if (user) {
                    const i_birthday = user.birthday.split("-").reverse().join("/");
                    user.birthday = i_birthday;

                    res.status(200).json({
                        success: true,
                        message: "Register successfully",
                        data: user,
                    });
                }
            }
        }
    }

    catch (err) {
        res.status(500).json({ success: false, message: "Server error: " + err.message, data: null });
    }
}

exports.logout = async function (req, res) {
    try {
        res.clearCookie('token');
        res.json({success: true, message: 'Logout successfully'});
    }
    
    catch (err) {
        res.status(500).json({ success: false, message: "Logout failed: " + err.message});
    }
}