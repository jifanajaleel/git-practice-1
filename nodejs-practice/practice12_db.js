//! Connecting to database & fetching records from database
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});

const app = express();
const PORT = process.env.PORT || 9000;

const courses = require("./routes/courses_db");
app.use("/api/v1/courses", courses);

app.listen(PORT, () => { 
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})