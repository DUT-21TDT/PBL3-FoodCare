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

const path = require("path");

const root = path.resolve(__dirname);

console.log(root);