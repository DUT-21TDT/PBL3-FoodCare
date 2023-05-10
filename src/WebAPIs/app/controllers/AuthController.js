const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
require("dotenv/config");

exports.login = login;          // POST: /login
exports.register = register;    // POST: /signup
exports.logout = logout;        // GET: /logout

async function login(req, res, next) {
    try {
        var username = req.body.username;
        var password = req.body.password;

        const user = await User.findByUsername(username);

        if (user) {

            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (passwordIsValid) {
                
                const token = jwt.sign({ username: user.username }, process.env.JWTSECRETKEY, { expiresIn: 7200 });

                res.cookie('token', token);

                user.dateofbirth = user.dateofbirth.toLocaleDateString('en-GB');
                user.createTime = user.createTime.toLocaleString('en-GB');

                res.status(200).json({
                    success: true,
                    message: "Login successfully",
                    data: user,
                    token: token,
                });
                
                req.username = username;
                req.action = 'Login';
                next();
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
            res.status(404).json({
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

async function register(req, res, next) {
    try {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var status = true;
        var permission = false;
        var name = req.body.name;
        var dateofbirth = req.body.dateofbirth;
        var gender = req.body.gender;

        const hashedpw = await bcrypt.hash(password, parseInt(process.env.BCRYPTKEY));

        const newUser = new User({
            username: username,
            password: hashedpw,
            email: email,
            status: status,
            permission: permission,
            name: name,
            dateofbirth: dateofbirth.split("/").reverse().join("-"),
            gender: gender,
            avatar: null,
            createTime: new Date(),
        });

        const user = await User.create(newUser);

        if (user) {

            const i_dateofbirth = user.dateofbirth.split("-").reverse().join("/");
            user.dateofbirth = i_dateofbirth;
            user.createTime = user.createTime.toLocaleString('en-GB');
                    
            res.status(200).json({
                success: true,
                message: "Register successfully",
                data: user,
            });

            req.username = username;
            req.action = 'Register';
            next();
        }
    }

    catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server error: " + err.message, 
            data: null 
        });
    }
}


async function logout(req, res) {
    try {
        // const user = req.data;

        // const logtime = (new Date()).toLocaleString('en-GB').split(',').join('');
        // const logusername = username;
        // const logaction = 'logout';
        // fs.appendFileSync("./server.log.txt", logtime + ', ' + logusername + ', ' + logaction + '\n');

        res.clearCookie('token');
        res.status(200).json({ success: true, message: 'Logout successfully' });
    }
    
    catch (err) {
        res.status(500).json({ success: false, message: "Logout failed: " + err.message});
    }
}