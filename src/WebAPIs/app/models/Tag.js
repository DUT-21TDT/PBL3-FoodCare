const mysql = require("../config/mysql.connect.js");

const Tag = function(tag) {
    this.tagname = tag.tagname
};

// create a new tag in database
Tag.create = async function(newTag) {
    try {
        const res = await mysql.query("insert into tag set ?", newTag);

        if (res[0].affectedRows) {
            return {tagid: res[0].insertId, ...newTag};
        }

        else return null;
    }

    catch (err) {
        console.log("Error while creating new tag: ", err);
        throw err;
    }
}

// remove tag
Tag.removeTag = async function(tagid) {
    try {
        const res = await mysql.query("delete from tag where tagid = ?", tagid);

        if (res[0].affectedRows) {
            return {tagid: tagid};
        }

        else return null;
    }

    catch (err) {
        console.log("Error while deleting tag: ", err);
        throw err;
    }
}

// add tags to food
Tag.addFoodTags = async function(foodid, tagids) {
    try {
        // const values = tagids.map(id => [foodid, id]);

        for (var tagid of tagids) {
            console.log(foodid, tagid);

            const [rows] = await mysql.execute('SELECT COUNT(*) as count FROM food_in_tag WHERE foodid = ? and tagid = ?', [Number(foodid), Number(tagid)]);
            
            if (rows[0].count > 0) {
                throw new Error("Duplicated primary key: food already has this tag");
            }

            else {
                const res = await mysql.query("insert into food_in_tag set ?", [{foodid, tagid}]);
            }
         
        }

        return {id: foodid};

    }

    catch (err) {
        console.log("Error while adding new tags to food: ", err);
        throw err;
    }
}

// remove tag from food
Tag.removeTagFromFood = async function(foodid, tagid) {
    try {
        const res = await mysql.query("delete from food_in_tag where foodid = ? and tagid = ?", [foodid, tagid]);

        if (res[0].affectedRows) {
            return {foodid: foodid, tagid: tagid};
        }

        else return null;
    }

    catch (err) {
        console.log("Error while deleting tag from food: ", err);
        throw err;
    }
}

// get all tags
Tag.getAllTags = async function() {
    try {
        const res = await mysql.query("select tagid, tagname from tag");

        if (res[0].length > 0) {
            return res[0];
        }

        else return null;
    }

    catch (err) {
        console.log("Error while getting all tags: ", err);
        throw err;
    }
}

// get a specific tag
Tag.getTagByTagid = async function(tagid) {
    try {
        const res = await mysql.query("select tagid, tagname from tag where tagid = ?", tagid);

        if (res[0].length > 0) {
            return res[0][0];
        }

        else return null;
    }

    catch (err) {
        console.log("Error while getting tag by tagid: ", err);
        throw err;
    }
}

// get food from tag
Tag.getFoodFromTags = async function(tagids) {
    try {
        const tagcount = tagids.length;
        const res = await mysql.query("select foodid from food_in_tag where tagid in (?) group by foodid having count(distinct tagid) = ?", [tagids, tagcount]);
        
        if (res[0].length > 0) {
            return res[0];
        }

        else return null;
    }

    catch (err) {
        console.log("Error while getting foods from a tag: ", err);
        throw err;
    }
}

// get tag from food
Tag.getTagsInFood = async function(foodid) {
    try {
        const res = await mysql.query("select tag.tagid, tag.tagname from tag inner join food_in_tag on tag.tagid=food_in_tag.tagid where foodid = ?", foodid);
        
        if (res[0].length > 0) {
            return res[0];
        }

        else return null;
    }

    catch (err) {
        console.log("Error while getting tags in a food: ", err);
        throw err;
    }
}

module.exports = Tag;