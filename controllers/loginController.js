const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = (req, res) => {
  console.log(req.body);
  // please validate the data here
};

const loginUser = (req, res) => {
  console.log(req.body);
  // please validate the data here
};

// For View
const loginView = (req, res) => {
  res.render("login", {});
};

//For Register Page
const registerView = (req, res) => {
  res.render("register", {});
};

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};
