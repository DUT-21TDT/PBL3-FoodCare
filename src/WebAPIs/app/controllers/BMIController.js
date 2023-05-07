const BMI = require("../models/BMI.js");

// GetAll - GetList => return a list of objects
// Get... => return an object
// UI datetime format: dd/mm/yyyy, time

//#region CREATE

// User update their own measurements
// User input their height and weight
// userid is taken from token, updateTime is taken from realtime
exports.update = async function(req, res) {
    try {
        const user = req.data;

        if (user) {

            var height = req.body.height;
            var weight = req.body.weight;

            // height and weight is mandatory information
            if ((!height) || (!weight)) {
                res.status(400).json({
                    success: false,
                    message: "Null input error",
                    data: null,
                });

                return;
            }

            const newBmi = new BMI({
                userid: user.userid,
                height: height,
                weight: weight,
                updateTime: (new Date()),
            });

            const bmi = await BMI.update(newBmi);

            if (bmi) {

                bmi.updateTime = bmi.updateTime.toLocaleString('en-GB');

                res.status(200).json({
                    success: true,
                    message: "Update BMI successfully",
                    data: bmi,       
                });
            }
            
            else {
                res.status(403).json({
                    success: false,
                    message: "Update failed",
                    data: null,
                });
            }
        }

        else {
            res.status(401).json({
                success: false,
                message: "Not logged in",
                data: null,
            });
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

//#endregion

//#region READ

// Get list of all bmi records of a user
exports.getAllBMIRecords = async function(req, res) {
    try {
        const user = req.data;      // if user login successfully, user information is stored in req.data (ref AuthMiddleware.isLoggedIn)

        if (user) {
            const id = user.userid;
            const bmiList = await BMI.getListMeasurements(id);

            if (bmiList) {

                const records = [];

                for (var rec of bmiList) {
                    const i_rec = new BMI({
                        userid: rec.userid,
                        height: rec.height,
                        weight: rec.weight,
                        updateTime: rec.updateTime.toLocaleString('en-GB'),
                    });

                    records.push(i_rec);
                }

                res.status(200).json({
                    success: true,
                    message: `Get list of BMI records of userid ${id} successfully`,
                    data: {count: records.length, list: records},
                });
            }

            else {
                res.status(200).json({
                    success: true,
                    message: "No measurements have been recorded",
                    data: null,
                })
            }
        }

        else {
            res.status(401).json({
                success: false,
                message: "Not logged in",
                data: null,
            })
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

// Get latest bmi records of a user
// Use for drawing chart (Week, Month, Year, ...)
exports.getLimitBMIRecords = async function(req, res) {
    try {
        const user = req.data;

        if (user) {

            var limit = req.params.limit;
            var userid = user.userid;

            const listRecords = await BMI.getLimitMeasurements(userid, limit);

            if (listRecords) {

                const records = [];

                for (var rec of listRecords) {
                    const i_rec = new BMI({
                        userid: rec.userid,
                        height: rec.height,
                        weight: rec.weight,
                        updateTime: rec.updateTime.toLocaleString('en-GB'),
                    });

                    records.push(i_rec);
                }

                res.status(200).json({
                    success: true,
                    message: `Get ${listRecords.length} records of userid ${userid} successfully`,
                    data: {
                        count: records.length,
                        list: records,
                    }
                });
            }

            else {
                res.status(200).json({
                    success: true,
                    message: "No records found",
                    data: {
                        count: 0,
                        list: null,
                    }
                });
            }
        }

        else {
            res.status(401).json({
                success: false,
                message: "Not logged in",
                data: null,
            })
        }
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
            data: null,
        });
    }
}

// Get current bmi records of a user
exports.getCurrentBMIRecord = async function(req, res) {
    try {
        const user = req.data;      // if user login successfully, user information is stored in req.data (ref AuthMiddleware.isLoggedIn)

        if (user) {
            const userid = user.userid;
            const bmi = await BMI.getCurrentMeasurement(userid);

            if (bmi) {
                // modify format of updateTime
                bmi.updateTime = bmi.updateTime.toLocaleString('en-GB');

                // const i_rec = new BMI({
                //     userid: bmi.userid,
                //     height: bmi.height,
                //     weight: bmi.weight,
                //     updateTime: bmi.updateTime.toLocaleString('en-GB'),
                // })

                res.status(200).json({
                    success: true,
                    message: `Get the current BMI record of userid ${userid} successfully`,
                    data: bmi,
                })
            }

            else {
                res.status(200).json({
                    success: true,
                    message: "No measurements have been recorded",
                    data: null,
                })
            }
        }

        else {
            res.status(401).json({
                success: false,
                message: "Not logged in",
                data: null,
            })
        }
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
            data: null,
        });
    }
}

//#endregion

//#region DELETE

// Delete BMI record through bmi_id
exports.delete = async function(req, res) {
    try {
        var bmi_id = req.params.bmi_id;

        const bid = await BMI.delete(bmi_id);

        if (bid) {
            res.status(200).json({
                success: true,
                message: `Delete bmi record #${bmi_id} successfully`,
                data: bid,
            });
        }

        else {
            res.status(404).json({
                success: false,
                message: "BMI record not found",
                data: null,
            });
        }
    }
    
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
            data: null,
        });
    }
}


// (system)

// exports.deleteOnLimit = async function(req, res) {
//     try {

//     }

//     catch (err) {

//     }
// }

//#endregion