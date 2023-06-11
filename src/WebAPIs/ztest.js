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

// const validator = require("validator");

// const isemail = validator.isEmail("abcxyz");

// console.log(isemail);

const express = require('express');
const mysql = require('mysql2/promise');
const notifier = require('react-toastify/dist/ReactToastify.css');

const app = express();

async function connectToDatabase() {
  try {
    const pool = mysql.createPool({
      host: 'netapi.studyit.dev',
      user: 'fcare',
      password: 'NguyetHung@1903',
      database: 'foodcare',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test the connection
    await pool.query('SELECT 1');

    return pool;
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit the application or handle the error as desired
  }
}

app.use(async (req, res, next) => {
  try {
    const pool = await connectToDatabase();
    req.db = pool;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' + err.message });
  }
});

function showToast(message) {
  notifier.notify({
    title: 'Toast',
    message: message,
    sound: true,
    wait: true
  });
}

app.get('/users', async (req, res) => {
  try {
    const [rows] = await req.db.query('SELECT * FROM user');
    res.json(rows);
    showToast("Thong bao");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' + err.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});