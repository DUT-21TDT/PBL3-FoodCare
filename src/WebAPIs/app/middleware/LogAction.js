const fs = require("fs");
const logfilePath = require("../config/path.config.js").logfilePath;

exports.logAction = async function logAction(req, res) {
    try {
        if (req.method == 'GET' || res.statusCode != 200) {
            return;
        }
        
        const logtime = (new Date()).toLocaleString('en-GB').split(',').join('');
        const logusername = req.username;
        const logaction = req.action;
        const actionType = req.method;

        if (logusername && logaction && actionType) {
            fs.appendFileSync(logfilePath, logtime + ', ' + logusername + ', ' + actionType + ', ' + logaction + '\n');
        }
    }

    catch (err) {
        console.error(err.stack);
    }
}