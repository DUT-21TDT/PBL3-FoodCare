const imgur = require("imgur");
const fs = require("fs");
const clientId = require("../config/imgurconfig.js");

// Upload image to imgur and response the image url
exports.uploadImage = async function(filePath) {
    try {
        const client = new imgur.ImgurClient({ clientId: clientId.imgur.clientId});

        const imgurResponse = await client.upload({
            image: fs.createReadStream(filePath),
            type: 'file',
        });

        if (imgurResponse.data.link) {
            return imgurResponse.data.link;
        }

        else return null;
    }

    catch (err) {
        throw err;
    }
}