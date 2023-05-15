// const mysql = require("./config/dbconnect.js");

// mysql.query("SELECT username FROM user").then(rows => {
//     console.log(rows); // rows only contain name and price properties
//   });
// // .catch(err => {
// //     console.log(err);
// // })

// // const Menu = function (menu) {
// //     this.menuname = menu.menuname;
// //     this.creator = menu.creator;

// //     // in database, we use table food_in_menu instead of this.foodList
// //     this.foodList = menu.foodList;
// // };

// // const newMenu = new Menu({
// //     menuname: "Menu so mot",
// //     creator: "quangnguyen",
// //     foodList: [1,2,3,4,5]
// // });

// // const {menuname, creator} = newMenu;
// // const {foodList} = newMenu;

// // const menuData = {menuname, creator};
// // const foods = {foodList};

// // console.log(foods);

// const express = require('express');
// const app = express();
// const ejs = require('ejs');

// // Set the view engine to EJS
// app.set('view engine', 'ejs');

// // Define a route that accepts a user's name as a parameter
// app.get('/:aname', (req, res) => {
//   const userName = req.params.aname;
//   // Render the template with the user's name
//   res.render("mailTemplate.ejs",{websiteName: "Foodcare", clientName: userName} );
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

const validator = require("validator");

const isemail = validator.isEmail("abcxyz");

console.log(isemail);