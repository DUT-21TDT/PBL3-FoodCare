const mysql = require("mysql2/promise.js");
const dbConfig = require("./mysql.config.js");

const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

module.exports = pool;
