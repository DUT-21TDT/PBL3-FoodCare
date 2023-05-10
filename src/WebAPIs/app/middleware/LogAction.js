const fs = require("fs");

exports.logAction = async function logAction(req, res) {
    try {
        console.log("4");

        if (req.method == 'GET' || res.statusCode != 200) {
            return;
        }
        
        const logtime = (new Date()).toLocaleString('en-GB').split(',').join('');
        const logusername = req.username;
        const logaction = req.action;
        const actionType = req.method;
        fs.appendFileSync("./server.log.txt", logtime + ', ' + logusername + ', ' + actionType + ', ' + logaction + '\n');
    }

    catch (err) {
        console.error(err.stack);
    }
}