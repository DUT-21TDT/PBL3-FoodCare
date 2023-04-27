const express = require("express");
const app = express();


// Read request's cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// ----------------------------------------------------------------

// Environment variable
require("dotenv").config();
const port = process.env.PORT || 5000;
// ----------------------------------------------------------------

// Read request's body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ----------------------------------------------------------------

// Web's routes
const mainRouter = require("./routers/MainRoute");
const authRouter = require("./routers/AuthRoute.js");
const adRouter = require("./routers/AdminRoute.js");
const userRouter = require("./routers/UserRoute.js");

app.get("/", (req, res) => {
    res.send("<h1> HOME PAGE </h1>");
});

app.use("/", mainRouter);

app.use("/", authRouter);

app.use("/admin_access", adRouter);

app.use("/", userRouter);

// ----------------------------------------------------------------
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
