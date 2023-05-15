const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const logfilePath = path.join(root, "asset", "actionLog.txt");
const ejsmailfilePath = path.join(root, "asset", "mailTemplate.ejs");

exports.logfilePath = logfilePath;
exports.ejsmailfilePath = ejsmailfilePath;