const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const upload = require("../config/multerconfig.js");
const uploadController = require("../controllers/UploadController.js");


exports.changePermission = async function(req, res) {
    try {
        var id = req.params.id;

        const uid = await User.changePermission(id);

        if (uid) {
            res.status(200).json({
                success: true,
                message: `Change permission userid ${uid.id} successfully`,
            });
        }

        else {
            res.status(401).json({
                success: false,
                message: "User not found",
            })
        }
    }

    catch (err) {
        res.status(500).json({status: false, message: err.message});
    }
}


exports.block = async function(req, res) {
    try {
        var id = req.params.id;

        const user = await User.findByID(id);

        if (user) {
            if (user.status == true) {
                const uid = await User.changeStatus(id);

                if (uid) {
                    res.status(200).json({
                        success: true,
                        message: `Block user ${uid.id} successfully`,
                    });
                }
            }

            else {
                res.status(401).json({
                    success: false,
                    message: `User ${id} is already blocked`
                });
            }
        }

        else {
            res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}

exports.unblock = async function(req, res) {
    try {
        var id = req.params.id;

        const user = await User.findByID(id);

        if (user) {
            if (user.status == false) {
                const uid = await User.changeStatus(id);

                if (uid) {
                    res.status(200).json({
                        success: true,
                        message: `Unblock user ${uid.id} successfully`,
                    });
                }
            }

            else {
                res.status(401).json({
                    success: false,
                    message: `User ${id} is already active`
                });
            }
        }

        else {
            res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}


exports.changePassword = async function(req, res) {
    try {
        var id = req.params.id;
        var oldPassword = req.body.oldpassword;
        var newPassword = req.body.newpassword;

        const user = await User.findById(id);

        if (user) {
            const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);

            if (passwordIsValid) {
                const hashedpw = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPTKEY));
            
                const uid = await User.changePassword(id, hashedpw);

                if (uid) {
                    res.status(200).json({
                        success: true,
                        message: "Change password successfully"
                    });
                }

                else {

                }
            }

            else {
                res.status(401).json({
                    success: false,
                    message: "Old password is incorrect"
                })
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
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


exports.uploadAvatar = async function(req, res) {
    try {
        var id = req.params.id;

        upload.single('avatar')(req, res, async (err) => {

            if (err) {
                throw new Error("Error while uploading avatar");
            }

            const filePath = req.file.path;

            const url = await uploadController.uploadImage(filePath);

            // Upload & Get image url successfully
            if (url) {
                // Update to database
                const imageUrl = await User.uploadAvatar(id, url);

                // Have response (affectedRows) from database
                if (imageUrl) {
                    res.status(200).json({
                        success: true,
                        message: "Upload avatar successfully",
                        data: imageUrl,
                    });
                }
        
                else {
                    res.status(400).json({
                        success: false,
                        message: "Upload avatar failed",
                        data: null,
                    });
                }
            }

            else {
                res.status(400).json({
                    success: false,
                    message: "Upload avatar failed",
                    data: null,
                });
            }
            
        });
    }

    catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
}


exports.getAllUsers = async function(req, res) {
    try {
        const usersList = await User.getAllUsers();

        if (list) {
            res.status(200).json({
                success: true,
                message: "Get list of users successfully",
                data: {
                    count: usersList.length,
                    list: usersList
                }
            });
        }

        else {
            res.status(200).json({
                success: true,
                message: "No user found",
                data: null
            })
        }
    }

    catch (err) {
        res.status(500).json({success: false, message: err.message, data: null});
    }
}


exports.getUserByID = async function(req, res) {
    try {
        var id = req.params.id;

        const user = await User.findByID(id);

        if (user) {
            res.status(200).json({
                success: true,
                message: `Get user ${id} successfully`,
                data: user,
            })
        }

        else {
            res.status(401).json({
                status: false,
                message: "User not found",
                data: null
            })
        }
    }

    catch (err) {
        res.status(500).json({status: false, message: err.message, data: null});
    }
}


