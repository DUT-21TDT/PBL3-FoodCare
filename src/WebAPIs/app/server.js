require("dotenv");

const port = process.env.PORT || 3000;

const app = require("./app.js");

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});