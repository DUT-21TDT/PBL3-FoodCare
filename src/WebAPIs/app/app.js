const express = require("express");
const app = express();
const morganBody = require("morgan-body")
// Read request's cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// ----------------------------------------------------------------
// hook morganBody to express app
morganBody(app, {logAllReqHeader:true, maxBodyLength:5000});

// Read request's body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ----------------------------------------------------------------
const cors = require('cors');
app.use(cors({ credentials: true, origin: true }))

// -----

app.use("/api/v1", require("./routers"));   

// ----------------------------------------------------------------

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Server error: " + err.message,
    })
})

module.exports = app;