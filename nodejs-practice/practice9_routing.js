//! Using route file & controller file. This is an update to practice8_routing.js
// This is linked with routes/courses.js
// remove "type":"module" from package.json to use require
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});

const app = express();
const PORT = process.env.PORT || 9000;

const courses = require("./routes/courses");  // imports router file
app.use("/api/v1/courses", courses);

app.listen(PORT, () => { 
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})