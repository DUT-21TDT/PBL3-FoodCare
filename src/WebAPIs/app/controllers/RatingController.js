const Rating = require("../models/Rating.js");

exports.create = create;                                        // user
exports.getListRatingsByMenuid = getListRatingsByMenuid;        // user
exports.getRatingByRatingid = getRatingByRatingid;              // user
exports.delete = remove;                                        // owner - admin


//#region CREATE

async function create(req, res, next) {
    try {      
        const user = req.data;

        if (user) {

            var menuid = req.params.menuid;  // Đang get menu đó => url giữ menuid
            var favorite = req.body.favorite;        
            var comment = req.body.comment;
        
            if (!(favorite || comment)) {
                res.status(400).json({
                    success: false,
                    message: "Null input error",
                    data: null,
                });
                return;
            }

            const newRating = new Rating({
                userid: user.userid,
                menuid: menuid,
                favorite: favorite,
                comment: comment,
                postTime: (new Date()),
            });

            const rating = await Rating.create(newRating);

            if (rating) {
                
                rating.postTime = rating.postTime.toLocaleString('en-GB');

                res.status(200).json({
                    sucess: true,
                    message: `Rate menuid ${menuid} successfully`,
                    data: rating,
                });
            }
        }

        req.username = req.data.username;
        req.action = `Post rating`;
        next();
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

async function getListRatingsByMenuid(req, res, next) {
    try {
        var menuid = req.params.menuid;

        const ratingsList = await Rating.getListRatingsByMenuid(menuid);
        
        if (ratingsList) {

            const ratings = [];

            for (var rec of ratingsList) {

                const i_rec = {
                    ratingid: rec.ratingid,
                    userid: rec.userid,
                    favorite: rec.favorite,
                    comment: rec.comment,
                    postTime: rec.postTime.toLocaleString('en-GB'),
                };

                ratings.push(i_rec);
            }

            res.status(200).json({
                success: true,
                message: "List ratings successfully",
                data: {
                    count: ratings.length,
                    list: ratings,
                },
            });
        }

        else {
            res.status(200).json({
                success: true,
                message: "Not rating yet",
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

async function getRatingByRatingid(req, res, next) {
    try {
        var ratingid = req.params.ratingid;

        const rating = await Rating.getRatingByRatingid(ratingid);

        if (rating) {
            rating.postTime = rating.postTime.toLocaleString('en-GB');

            res.status(200).json({
                success: true,
                message: "Get rating successfully",
                data: rating
            });
        }

        else {
            res.status(404).json({
                success: false,
                message: "Rating not found",
                data: null,
            });
        }
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
            data: null,
        })
    }
}

//#endregion


//#region DELETE


async function remove(req, res, next) {
    try {
        var ratingid = req.params.raingid;

        const rating = await Rating.getRatingByRatingid(ratingid);

        if (!rating) {
            return res.status(404).json({
                success: false,
                message: `Rating not found`,
                data: null
            });
        } 

        if (!req.data || (req.data.username != rating.creator && req.data.permission != 1)) {
            return res.status(403).json({
                success: false,
                message: `Action failed: no permission`,
                data: null,
            })
        }

        const rid = await Rating.delete(ratingid);

        res.status(200).json({
            success: true,
            message: `Delete rating #${ratingid} successfully`,
            data: fid
        });

        req.username = req.data.username;
        req.action = `Delete rating #${ratingid}`;
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

//#endregion