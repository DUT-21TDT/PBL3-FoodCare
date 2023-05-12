const imgur = require("imgur");
const fs = require("fs");
const clientId = require("../config/imgur.config.js");

const imgurUrlRegex = /^https?:\/\/(?:i\.)?imgur\.com\/(?:\w+\/)?(\w+)\.(?:jpe?g|png|gif|mp4)$/i;

// Upload image to imgur and return the image url
exports.uploadImage = async function(filePath) {
    try {
        const client = new imgur.ImgurClient({ clientId: clientId.imgur.clientId});

        const imgurResponse = await client.upload({
            image: fs.createReadStream(filePath),
            type: 'file',
        });

        
        if (imgurResponse.data.link && imgurUrlRegex.test(imgurResponse.data.link)) {
            return imgurResponse.data.link;
        } 
        
        else {
            return null;
        }    
    }

    catch (err) {
        throw err;
    }
}