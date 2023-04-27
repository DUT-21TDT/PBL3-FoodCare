const User = require("../models/User.js");
const bcrypt = require("bcrypt");

exports.changePermission = async function(req, res) {
    try {
        var id = req.params.id;

        const uid = User.changePermission(id);
    }

    catch (err) {

    }
}

exports.changePermission = function(req, res) {
    var id = req.params.id;

    User.changePermission(id, (err, uid) => {
        if (err) {
            res.status(500).json({status: false, message: "Server error"});
        }

        else if (uid) {
            res.status(200).json({
                status: true,
                message: "Change permission successfully"
            });
        }

        else {
            res.status(401).json({
                status: false,
                message: "User not found"
            });
        }
    });
}

exports.changeStatus = function(req, res) {
    var id = req.params.id;

    User.changeStatus(id, (err, uid) => {
        if (err) {
            res.status(500).json({status: false, message: "Server error"});
        }

        else if (uid) {
            res.status(200).json({
                status: true,
                message: "Change status successfully"
            });
        }

        else {
            res.status(401).json({
                status: false,
                message: "User not found"
            });
        }
    });
}

exports.changePassword = function(req, res) {

    var id = req.params.id;
    var oldPassword = req.body.oldpassword;
    var newPassword = req.body.newpassword;

    User.findById(id, (err, user) => {

        if (err) {
            res.status(500).json({status: false, message: "Server error"});
            return;
        }

        if (!user) {
            res.status(401).json({status: false, message: "User not found"});
        }

        else {
            const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);

            if (passwordIsValid) {

                bcrypt.hash(newPassword, parseInt(process.env.BCRYPTKEY)).then((hashedpw) => {

                    User.changePassword(id, hashedpw, (err, uid) => {
                        if (err) {
                            res.status(500).json({status: false, message: "Server error"});
                        }
                
                        else if (uid) {
                            res.status(200).json({
                                status: true,
                                message: "Change password successfully"
                            })
                        }
                
                        else {
                            res.status(401).json({
                                status: false,
                                message: "User not found"
                            })
                        }
                    });
                })
            }

            else {
                res.status(401).json({
                    status: false,
                    message: "Old password is incorrect"
                })
            }
        }
    });
}

exports.getAllUsers = async function(req, res) {
    try {
        const list = await User.getAllUsers();

        if (list) {
            res.status(200).json({
                status: true,
                message: "Get list of users successfully",
                data: {
                    count: list.length,
                    list: list
                }
            });
        }

        else {
            res.status(404).json({
                status: false,
                message: "No user found",
                data: null
            })
        }
    }

    catch (err) {
        res.status(500).json({status: false, message: "Server error", data: null});
    }
}

// exports.getAllUsers = function(req, res) {

//     User.getAllUsers((err, list) => {
//         if (err) {
//             res.status(500).json({status: false, message: "Server error", data: null});
//         }

//         else if (list) {
//             res.status(200).json({
//                 status: true,
//                 message: "Get list of users successfully",
//                 data: list
//             })
//         }

//         else {
//             res.status(404).json({
//                 status: false,
//                 message: "No food found",
//                 data: null
//             })
//         }
//     })
// }

exports.getUserByID = function(req, res) {

    var id = req.params.id;

    User.findById(id, (err, user) => {
        if (err) {
            res.status(500).json({status: false, message: "Server error", data: null});
        }

        else if (user) {
            res.status(200).json({
                status: true,
                message: `Get user ${id} successfully`,
                data: user
            })
        }

        else {
            res.status(401).json({
                status: false,
                message: "No user found",
                data: null
            })
        }
    })
}

exports.delete = function(req, res) {
    var id = req.params.id;

    User.delete(id, (err, uid) => {
        if (err) {
            res.status(500).json({status: false, message: "Server error"});
        }

        else if (uid) {
            res.status(200).json({
                status: true,
                message: `Delete user ${uid} successfully`
            });
        }

        else {
            res.status(401).json({
                status: false,
                message: "User not found"
            });
        }
    });
}