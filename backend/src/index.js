const express = require("express");
const app = express();
require('dotenv').config();
const express = require('express');
app.use(express.json());
const routes = require('./routes/urlroutes');
app.use('/', routes)



app.listen(3000, () => {
    console.log("Server running on port 3000");
});