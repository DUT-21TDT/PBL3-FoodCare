const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const logfilePath = path.join(root, "asset", "actionLog.txt");

exports.logfilePath = logfilePath;