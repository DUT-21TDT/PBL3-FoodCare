const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const upload = require("../config/multer.config.js");
const uploadController = require("../controllers/UploadController.js");

exports.getUserByID = getUserByID;              // admin
exports.getAllUsers = getAllUsers;              // admin
exports.viewProfile = viewProfile;              // user
exports.changePermission = changePermission;    // admin
exports.block = block;                          // admin
exports.unblock = unblock;                      // admin
exports.changePassword = changePassword;        // user
exports.uploadAvatar = uploadAvatar;            // user
exports.updateProfile = updateProfile;          // user
exports.deleteUser = deleteUser;

//#region UPDATE

async function changePermission(req, res, next) {
    try {
        var userid = req.params.userid;

        const uid = await User.changePermission(userid);

        if (uid) {
            res.status(200).json({
                success: true,
                message: `Change permission user #${uid.id} successfully`,
                data: uid,
            });
        }

        else {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            })
        }

        req.username = req.data.username;
        req.action = `Changing permission user #${userid}`;
        next();
    }

    catch (err) {
        res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
    }
}


async function block(req, res, next) {
    try {
        var username = req.params.username;

        const user = await User.findByUsername(username);

        if (user.username == username) {
            res.status(403).json({
                success: false,
                message: `Action failed: cannot block this user`,
                data: null
            })
        }

        if (user) {
            const uid = await User.changeStatus(user.userid);
            if (user.status == true) {
                res.status(200).json({
                    success: true,
                    message: `Unblock user #${uid.id} successfully`,
                    data: uid
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: `Block user #${uid.id} successfully`,
                    data: null
                });
            }
        }

        else {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        // req.username = req.data.username;
        // req.action = `Block user #${userid}`;
        // next();
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: null
        });
    }
}

async function unblock(req, res, next) {
    try {
        var userid = req.params.userid;

        const user = await User.findByID(userid);

        if (user) {
            if (user.status == false) {
                const uid = await User.changeStatus(userid);

                if (uid) {
                    res.status(200).json({
                        success: true,
                        message: `Unblock user ${uid.id} successfully`,
                        data: uid,
                    });
                }
            }

            else {
                res.status(403).json({
                    success: false,
                    message: `User ${id} is already active`,
                    data: null,
                });
            }
        }

        else {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        req.username = req.data.username;
        req.action = `Unblock user #${userid}`;
        next();
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
            data: null,
        });
    }
}


async function changePassword(req, res, next) {
    try {
        var oldPassword = req.body.oldpassword;
        var newPassword = req.body.newpassword;

        const user = req.data;
        const id = user.userid;

        if (user) {
            const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);

            if (passwordIsValid) {
                const hashedpw = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPTKEY));
            
                const uid = await User.changePassword(id, hashedpw);

                if (uid) {
                    res.status(200).json({
                        success: true,
                        message: "Change password successfully",
                        data: uid,
                    });
                }

                else {
                    res.status(403).json({
                        success: false,
                        message: "Change password failed",
                        data: null,
                    });
                }
            }

            else {
                res.status(401).json({
                    success: false,
                    message: "Old password is incorrect",
                    data: null,
                })
            }

            req.username = req.data.username;
            req.action = `Change password`;
            next();
        }

        else {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            })
        }
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: null,
        });
    }
}


async function uploadAvatar(req, res, next) {
    try {
        const user = req.data;
        const id = user.userid;

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            })

            return;
        }

        
        const imgUrl = req.body.avatarImage;
        
        const status =  await User.uploadAvatar(id, imgUrl);

        if (status) {
            res.status(200).json({
                success: true,
                message: "Upload avatar successfully",
                data: {url, id: id},
            });
        }

        else {
            res.status(403).json({
                success: false,
                message: "Upload avatar failed",
                data: null,
            });
        }

        // upload.single('avatar')(req, res, async (err) => {

        //     if (err) {
        //         throw new Error("Error while uploading avatar");
        //     }

        //     const filePath = req.file.path;

        //     const url = await uploadController.uploadImage(filePath);

        //     // Upload & Get image url successfully
        //     if (url) {
        //         // Update to database
        //         const imageUrl = await User.uploadAvatar(id, url);

        //         // Have response (affectedRows) from database
        //         if (imageUrl) {
        //             res.status(200).json({
        //                 success: true,
        //                 message: "Upload avatar successfully",
        //                 data: {url, id: id},
        //             });
        //         }
        
        //         else {
        //             res.status(403).json({
        //                 success: false,
        //                 message: "Upload avatar failed",
        //                 data: null,
        //             });
        //         }
        //     }

        //     else {
        //         res.status(403).json({
        //             success: false,
        //             message: "Upload avatar failed",
        //             data: null,
        //         });
        //     }
            
        // });

        req.username = req.data.username;
        req.action = `Update avatar`;
        next();
    }

    catch (err) {
        res.status(500).json({ success: false, message: "Server error: " + err.message, data: null });
    }
}


async function updateProfile(req, res, next) {
    try {

        const user = req.data;
        const id = user.userid;

        if (user) {
            var newName = req.body.name;
            var newBirthday = req.body.dateofbirth.split("/").reverse().join("-");
            var newGender = req.body.gender;

            const uid = await User.updateProfile(id, newName, newBirthday, newGender);

            if (uid) {
                res.status(200).json({
                    success: true,
                    message: `Update profile successfully`,
                    data: uid,
                });
            }
        }

        else {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: uid
            });
        }

        req.username = req.data.username;
        req.action = `Update profile`;
        next();
    }

    catch (err) {
        res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
    }
}

//#endregion

//#region READ

async function getAllUsers(req, res, next) {
    try {
        const usersList = await User.getAllUsers();

        if (usersList) {

            const users = [];

            for (const user of usersList) {

                const i_user = new User({
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    status: user.status,
                    permission: user.permission,
                    name: user.name,
                    dateofbirth: user.dateofbirth.toLocaleDateString('en-GB'),
                    gender: user.gender,
                    avatar: user.avatar,
                    createTime: user.createTime.toLocaleString('en-GB'),
                });

                users.push({userid: user.userid,...i_user});
            }

            res.status(200).json({
                success: true,
                message: "Get list of users successfully",
                data: {
                    count: users.length,
                    list: users,
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
        res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
    }
}

// (admin)
async function getUserByID(req, res, next) {
    try {
        var id = req.params.userid;

        const user = await User.findByID(id);


        if (user) {

            // const i_user = new User({
            //     username: user.username,
            //     password: user.password,
            //     status: user.status,
            //     permission: user.permission,
            //     name: user.name,
            //     email: user.email,
            //     dateofbirth: user.dateofbirth.toLocaleDateString('en-GB'),
            //     gender: user.gender,
            //     avatar: user.avatar,
            //     createTime: user.createTime.toLocaleString('en-GB'),
            // });

            res.status(200).json({
                success: true,
                message: `Get user #${id} successfully`,
                // data: {
                //     userid: user.userid, ...i_user
                // },
                data:user
            });
        }

        else {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            })
        }
    }

    catch (err) {
        res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
    }
}

async function viewProfile(req, res, next) {
    try {
        var id = req.params.userid;

        const user = await User.findByID(id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            });
            return;
        }

        // else if (user.status == false) {
        //     res.status(403).json({
        //         success: false,
        //         message: `User #${id} is blocked`,
        //         data: null
        //     });
        // }

        // else await getUserByID(req, res);

        // const i_user = new User({
        //     username: user.username,
        //     status: user.status,
        //     permission: user.permission,
        //     name: user.name,
        //     dateofbirth: user.dateofbirth.toLocaleDateString('en-GB'),
        //     gender: user.gender,
        //     avatar: user.avatar,
        //     createTime: user.createTime.toLocaleString('en-GB'),
        // });

        res.status(200).json({
            success: true,
            message: `Get user #${id} successfully`,
            // data: {
            //     // userid: user.userid, ...i_user
            //     dat
            // },
            data: user
        })
    }

    catch (err) {
        res.status(500).json({success: false, message: "Server error: " + err.message, data: null});
    }
}

//#endregion

// delete
async function deleteUser (req, res, next){
    try {
        const username = req.params.username;
        const user = await User.findByUsername(username);
        if (user) {
            const uid = await User.delete(user.userid);
            if (uid) {
                res.status(200).json({
                    success: true,
                    message: `${username} has been deleted.`
                });
            } else {
                res.status(403).json({
                    success: true,
                    message: `Can not delete username = ${username}`
                });
            }
        } 
        else {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        // req.username = req.data.username;
        // req.action = `Block user #${userid}`;
        // next();
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: null
        });
    }
}