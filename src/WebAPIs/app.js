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
const bParserConfig = require("./app/config/bodyParserConfig");
app.use(bodyParser.json({
  limit: bParserConfig.limit, 
  extended: bParserConfig.extended, 
  parameterLimit: bParserConfig.parameterLimit
}));

// ----------------------------------------------------------------
const cors = require('cors');
app.use(cors({ credentials: true, origin: true }))

// -----

app.use("/api/v1", require("./app/routers"));   

// ----------------------------------------------------------------

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Server error: " + err.message,
    })
})

module.exports = app;