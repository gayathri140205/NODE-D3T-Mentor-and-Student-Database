const express = require("express");
const bodyparser = require("body-parser");
const {connectToDatabase} = require("./dbconfig");

require("dotenv").config();

connectToDatabase();
const http_server = express();


// INJECT BODY-PARSER MIDDLEWARE
http_server.use(bodyparser.json());

http_server.use('/api',require("./controllers/task.controller"))



// starts a simple http server locally on port 3000
http_server.listen(process.env.PORT,process.env.HOSTNAME,() => {
  console.log("Listening on 127.0.0.1:3000");
});