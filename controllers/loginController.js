const User = require("../models/User");
const bcrypt = require("bcryptjs");

//For Register Page
const registerView = (req, res) => {
  res.render("register", {});
};

const registerUser = (req, res) => {
  console.log(req.body);
  // please validate the data here
};

// For View
const loginView = (req, res) => {
  res.render("login", {});
};
module.exports = {
  registerView,
  loginView,
  registerUser,
};
