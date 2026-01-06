//! Integrating sequelize to API

const express = require("express");

const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});
const PORT = process.env.PORT || 9000;

const app = express();
var sequelize = require("./config/orm");  // if you define sequelize in here, automatically it'll get executed since there are no functions defined inside orm.js

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

app.use(logger);
app.use(express.json());

// this is for users table. link - http://localhost:5000/api/v1/users. login link - http://localhost:5000/api/v1/users/login
const users = require("./routes/users");  // to implement sign-up api, save hashed pwd & token generation
app.use("/api/v1/users", users);

// this is for courses table. link - http://localhost:5000/api/v1/courses or http://localhost:5000/api/v1/courses/1
const courses = require("./routes/courses_db");
app.use("/api/v1/courses", courses);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})

/*
STEPS to initialize a new project using ORM:
------
1. Create orm.js
create sequelize instance, authenticate & sync.
Import it into practice12_db.js
2. Update repository file with model & thus convert to ORM code
3. Other files won't have much changes. Still check controller file once and check parameters of functions
*/

/*
1. run practice12_db.js
2. give below object in postman POST method with route as http://localhost:5000/api/v1/courses.
Also provide Authenticatio token as -> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMyIsImlhdCI6MTc2NjgzOTc2MH0.1UR6gI_oHLOLmQKK3oRAHddILoNB3RbuQQtxw8IzPP4
{
    "title":"UI development",
    "courseDuration": 6,
    "noOfSkills": 7 
}
3. In the response Body, you will see
{
    "success": true,
    "data": {
        "message": "Course created successfully"
    }
}
4. Then give GET method & click on SEND. You'll get below object in response Body
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "UI development",
            "duration": 6,
            "noOfSkills": 7,
            "createdAt": "2026-01-05T12:12:19.817Z",
            "updatedAt": "2026-01-05T12:12:19.817Z"
        }
    ]
}
*/