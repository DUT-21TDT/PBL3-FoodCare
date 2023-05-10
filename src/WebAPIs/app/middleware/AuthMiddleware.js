const jwt = require("jsonwebtoken");
const authValid = require("../validation/auth.validation.js");

exports.isLoggedin = [
    async function checkToken(req, res, next) {
        try {
            if (req.cookies.token) {
                next();
            } 
            
            else {
                res.status(401).json({
                    success: false,
                    message: "authToken not found"
                });
            }
        }

        catch (err) {
            // res.status(500).json({
            //     success: false,
            //     message: "Server error: " + err.message,
            // })
            next(err);
        }
    }, 
    
    async function verify(req, res, next) {
        try {
            const token = req.cookies.token;
            const j_username = jwt.verify(token, process.env.JWTSECRETKEY);
    
            const user = await authValid.checkExistUsername(j_username.username);

            if (user) {
                if (user.status == true) {
                    req.data = user;
                    next();
                }

                else {
                    res.status(403).json({
                        success: false,
                        message: "User is being blocked",
                    });
                }
            }

            else {
                res.status(401).json({
                    success: false,
                    message: "User not found",
                })
            }
        }

        catch (err) {
            // res.status(500).json({
            //     success: false,
            //     message: "Server error: " + err.message,
            // });
            next(err);
        }
    }
]


exports.isLoggedout = async (req, res, next) => {
    try {
        if (!req.cookies.token) {
            next();
        }

        else {
            const token = req.cookies.token;

            const jusername = jwt.verify(token, process.env.JWTSECRETKEY);

            const username = await authValid.checkExistUsername(jusername.username);

            if (!username) {
                next();
            }

            else {
                // redirect profile page
                res.status(403).json({
                    success: false,
                    message: "Error",
                })
            }
        }
    }

    catch (err) {
        next(err);
    }
}


exports.isAdmin = async (req, res, next) => {
    try {
        if (req.data.permission == true) {
            next();
        }
    
        else {
            res.status(403).json("CANNOT ACCESS!");
        }
    }

    catch (err) {
        next(err);
    }
}

exports.signup = [
    async (req, res, next) => {
        try {
            if (authValid.checkFormatUsername(req.body.username)) {
                next();
            }
    
            else {
                res.status(401).json({
                    success: false,
                    message: "Incorrect username format",
                })
            }
        }

        catch (err) {
            // res.status(500).json({
            //     success: false,
            //     message: "Server error: " + err.message,
            // })
            next(err);
        }
    },

    async (req, res, next) => {
        try {
            const user = await authValid.checkExistUsername(req.body.username);
        
            if (user) {
                res.status(401).json({
                    success: false,
                    message: "Username is already taken",
                });
            } 
            
            else {
                next();
            }
        }

        catch (err) {
            // res.status(500).json({
            //     success: false,
            //     message: "Server error: " + err.message,
            // })
            next(err);
        }

    },

    async (req, res, next) => {
        try {
            if (authValid.checkFormatEmail(req.body.email)) {
                next();
            }

            else {
                res.status(401).json({
                    success: false,
                    message: "Incorrect email format",
                })
            }
        } 
        
        catch (err) {
            // res.status(500).json({
            //     success: false,
            //     message: "Server error: " + err.message,
            // })
            next(err);
        }
    },

    async (req, res, next) => {
        try {
            const user = await authValid.checkExistEmail(req.body.email);

            if (user) {
                res.status(401).json({
                    success: false,
                    message: "Email is already taken",
                });
            }

            else {
                next();
            }
        }

        catch (err) {
            // res.status(500).json({
            //     success: false,
            //     message: "Server error: " + err.message,
            // })
            next(err);
        }
    }
]

exports.signin = [
    async (req, res, next) => {
        try {
            if (authValid.checkFormatUsername(req.body.username)) {
                next();
            }
    
            else {
                res.status(401).json({
                    success: false,
                    message: "Incorrect username format",
                });
            }
        }
        catch (err) {
            // res.status(500).json({
            //     success: false,
            //     message: "Server error: " + err.message,
            // })
            next(err);
        }
    },

    async (req, res, next) => {
        try {
            if (req.body.password) {
                next();
            }

            else {
                res.status(401).json({
                    success: false,
                    message :"Empty password error",
                })
            }
        }

        catch (err) {
            // res.status(500).json({
            //     success: false,
            //     message: "Server error: " + err.message,
            // })
            next(err);
        }
    }
]