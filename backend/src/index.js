const express = require("express");
const app = express();

app.use(express.json());
const routes = requires('./routes/urlroutes');
app.use('/', routes)



app.listen(3000, () => {
    console.log("Server running on port 3000");
    response.send("Hello World");
});