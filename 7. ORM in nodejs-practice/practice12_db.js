//! ORM - Object Relational Mapping
/*
Benefits of ORM:
*)Class to DB table mapping will be done by ORM automatically
*)No need to write SQL query
*)Support relationship
*)Popular ORM in nodejs is Sequelize
*)Switching between 1 db to another is possible

Steps:
------
*) create models/course.js
*) updated getAllCourses inside repositories/courses.js
*/

const express = require("express");
const dotenv = require("dotenv");

dotenv.config({path: "./config/config.env"});

const app = express();

const PORT = process.env.PORT || 9000;
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

app.use(logger);

app.use(express.json());

// this is for users table
const users = require("./routes/users");
app.use("/api/v1/users", users);

// this is for courses table
const courses = require("./routes/courses_db");
app.use("/api/v1/courses", courses);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})
