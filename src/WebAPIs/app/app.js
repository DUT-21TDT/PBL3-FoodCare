const express = require("express");
const app = express();

// Read request's cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// ----------------------------------------------------------------

// Read request's body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ----------------------------------------------------------------

// Web's routes
const authRouter = require("./routers/Auth/AuthRoute.js");
const guestRouter = require("./routers/Guest/index.js");
const adRouter = require("./routers/Admin/index.js");
const userRouter = require("./routers/User/index.js");

app.use("/", guestRouter);

app.use("/", authRouter);

app.use("/admin_access", adRouter);

app.use("/", userRouter);

// ----------------------------------------------------------------

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Server error: " + err.message,
    })
})

module.exports = app;