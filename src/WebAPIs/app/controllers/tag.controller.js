const Tag = require("../models/Tag.js");

//#region CREATE

async function createTag(req, res, next) {
    try {
        var tagname = req.body.tagname;

        if (!tagname) {
            return res.status(400).json({
                success: false,
                message: "Null input error",
                data: null
            });
        }

        const newTag = new Tag({
            tagname: tagname
        });

        const tag = await Tag.create(newTag);

        if (tag) {
            res.status(200).json({
                success: true,
                message: "Create tag successfully",
                data: tag,
            });

            req.username = req.data.username;
            req.action = `Create tag #${tag.tagid, tag.tagname}`;
            next();
        }

        else {
            res.status(403).json({
                success: false,
                message: "Create tag failed",
                data: null
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

//#region UPDATE 

async function renameTag(req, res, next) {
    try {
        var tagid = req.params.tagid;
        var newName = req.body.newName;

        if (!newName) {
            return res.status(400).json({
                success: false,
                message: "Null input error",
                data: null
            });
        }

        const newtag = await Tag.renameTag(tagid, newName);

        if (newtag) {
            res.status(200).json({
                success: true,
                message: "Rename tag successfully",
                data: newtag,
            });

            req.username = req.data.username;
            req.action = `Rename tag #${tagid} to ${newName}`;
            next();
        }

        else {
            res.status(403).json({
                success: false,
                message: "Rename tag failed",
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

async function addFoodTags(req, res, next) {
    try {
        var foodid = req.params.foodId;
        var tagids = req.body.tagids;

        if (!foodid || !tagids.length) {
            return res.status(400).json({
                success: false,
                message: "Null input error",
                data: null
            });
        }

        const id = await Tag.addFoodTags(foodid, tagids);

        if (id) {
            res.status(200).json({
                success: true,
                message: "Add tags to food successfully",
            });

            req.username = req.data.username;
            req.action = `Add tag #${tagids} to food #${foodid}`;
            next();
        }

        else {
            res.status(403).json({
                success: false,
                message: "Add tags to food failed",
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

async function removeFoodTags(req, res, next) {
    try {
        var foodid = req.params.foodId;
        var tagid = req.body.tagid;

        const rm = await Tag.removeTagFromFood(foodid, tagid);

        if (rm) {
            res.status(200).json({
                success: true,
                message: "Delete tag from food successfully",
            });

            req.username = req.data.username;
            req.action = `Delete tag #${tagid} from food #${foodid}`;
            next();
        }

        else {
            res.status(403).json({
                success: false,
                message: "Delete tag from food failed",
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

async function getAllTags(req, res, next) {
    try {
        const allTags = await Tag.getAllTags();

        if (allTags) {
            res.status(200).json({
                success: true,
                message: "Get all tags successfully",
                data: allTags
            });
        }

        else {
            res.status(200).json({
                success: true,
                message: "No tag found",
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

async function getTagById(req, res, next) {
    try {
        var tagid = req.params.tagid;
        const tag = await Tag.getTagByTagid(tagid);

        if (tag) {
            res.status(200).json({
                success: true,
                message: `Get tag #${tagid} successfully`,
                data: tag
            });
        }

        else {
            res.status(404).json({
                success: false,
                message: "Tag not found",
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

async function getTagsInFood(req, res, next) {
    try {
        var foodid = req.params.foodId;

        const tags = await Tag.getTagsInFood(foodid);

        if (tags) {
            res.status(200).json({
                success: true,
                message: `Get tags in food #${foodid} successfully`,
                data: tags
            });
        }

        else {
            res.status(200).json({
                success: true,
                message: "No tag found",
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

async function getFoodFromTagsFilter(req, res, next) {
    try {
        var tagids = req.body.tagids;
        const foods = await Tag.getFoodFromTags(tagids);

        if (foods) {
            res.status(200).json({
                success: true,
                message: `Get foods by tags filter successfully`,
                data: foods
            });
        }

        else {
            res.status(200).json({
                success: true,
                message: "No food found",
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

//#region DELETE

async function removeTag(req, res, next) {
    try {
        var tagid = req.params.tagid;

        const tag = await Tag.removeTag(tagid);

        if (tag) {
            res.status(200).json({
                success: true,
                message: `Delete tag #${tagid} successfully`,
            });

            req.username = req.data.username;
            req.action = `Delete tag #${tag.tagid}`;
            next();
        }

        else {
            res.status(403).json({
                success: false,
                message: "Delete tag failed",
                data: null
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

async function removeTagFromFood(req, res, next) {
    try {
        var foodid = req.params.foodId;
        var tagids = req.body.tagids;

        for (var tagid of tagids) {
            await Tag.removeTagFromFood(foodid, tagid);
        }

        res.status(200).json({
            success: true,
            message: `Delete tags #${tagids} from food #${foodid} successfully`,
        });
        
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
module.exports = {
    createTag,              // POST admin-access/tags/create
    removeTag,              // DELETE admin-access/tags/delete/tagid=:tagid/
    renameTag,              // PUT admin-access/tags/update/tagid=:tagid/
    getAllTags,             // GET admin-access/tags/
    getTagById,             // GET admin-access/tags/tagid=:tagid/
    addFoodTags,            // PUT admin-access/foods/add-tags/foodid=:foodid/
    removeTagFromFood,      // DELETE admin-access/foods/remove-tags/foodid=:foodid/
    getTagsInFood,          // GET public/foods/:foodId/tags/
    getFoodFromTagsFilter,  // GET public/foods/tags-filter/
};