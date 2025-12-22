//! Using route file
// This is linked with routes/course.js
// remove "type":"module" from package.json to use require
const express = require("express");  // imports Express framework
const dotenv = require("dotenv");  // imports dotenv to read .env files
dotenv.config({path: "./config/config.env"});  // loads environment variables from config.env into process.env

const app = express();  // creates an Express application. app represents your server
const PORT = process.env.PORT || 9000;  // if PORT is not found, uses 9000 as default

const course = require("./routes/course");  // imports the course router from routes/course.js. This file contains all course-related APIs
app.use("/api/v1/course", course);  // mounts the course router. Base path = /api/v1/course. http link would be http://localhost:5000/api/v1/course
//! / in router → /api/v1/courses
//! /:id → /api/v1/courses/:id

app.listen(PORT, () => {  // Starts the server. Opens the port. Now your APIs are accessible from browser/Postman (Now server can accept requests)
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})