const fs = require("fs");

exports.logAction = async function(req, res, next) {
    try {

        if (req.method == 'GET' || res.statusCode != 200) {
            return;
        }
        
        const logtime = (new Date()).toLocaleString('en-GB').split(',').join('');
        const logusername = req.username;
        const logaction = req.action;
        fs.appendFileSync("./server.log.txt", logtime + ', ' + logusername + ', ' + logaction + '\n');
    }

    catch (err) {
        console.error(err.stack);
    }
}