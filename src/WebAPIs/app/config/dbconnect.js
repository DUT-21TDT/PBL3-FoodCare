const mysql = require("mysql2/promise.js");
const dbConfig = require("../config/dbconfig.js");

const connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

// connection.connect((error) => {
//     if (error) throw error;
//     console.log(`Successfully connected to the database: ${dbConfig.DB}`);
// });

module.exports = connection;
