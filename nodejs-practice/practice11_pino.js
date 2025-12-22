//! Integrating logger library
// here we are using pino. It's a logger that we can use in production application. It's a fast logger
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({path: "./config/config.env"});

const app = express();
const PORT = process.env.PORT || 9000;
const logger = require("./middlewares/logger");

app.use(logger);

const courses = require("./routes/courses");
app.use("/api/v1/courses", courses);

app.listen(PORT, () => { 
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})