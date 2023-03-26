const dbConfig = require("../configs/db.config.js");

var Connection = require("tedious").Connection;
var config = {
  server: dbConfig.HOST,
  authentication: {
    type: "default",
    options: {
      userName: dbConfig.USER,
      password: dbConfig.PASSWORD,
    },
  },
  options: {
    encrypt: true,
    database: dbConfig.DB,
    trustServerCertificate: true,
  },
};
var connection = new Connection(config);
connection.on("connect", function (err) {
  // If no error, then good to proceed.
  if (err) console.log(err);
  else console.log("Database is Connected");
});

connection.on("end", function (err) {
  // If no error, then good to proceed.
  if (err) console.log(err);
  else console.log("Database is Disconnected");
});

module.exports = {
  connection,
};
