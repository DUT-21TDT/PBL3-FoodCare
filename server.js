//js
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const cnn = require("./models");
cnn.connection.connect();
cnn.connection.close();
// routes
app.use("/", require("./routes/login"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server don start for port: " + PORT));
