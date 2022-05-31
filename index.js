const express = require ('express');
const app = express();
const PORT = 3000;
const path = require('path');
const {User} = require("./src/db/db_connect");

app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port 3000");
});

app.get('/', function (req, res) {
    console.log("HTML page is showing")
    res.sendFile(path.join(__dirname, './src/views/page.html'));
});