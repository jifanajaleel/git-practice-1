//! Connecting to database & fetching records from database
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({path: "./config/config.env"});

const app = express();

const PORT = process.env.PORT || 9000;
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

app.use(logger);

app.use(express.json());  // app.use(express.json()) allows your Express server to read and use JSON data sent by the client
/*
What is express.json()?
*) It is a built-in middleware in Express
*) It reads JSON data from the request body
*) It converts JSON → JavaScript object
*) Attaches it to req.body. Your route/controller can use it. If you remove express.json(), req.body === undefined
*) express.json() is needed for POST, PUT, PATCH. Not required for GET requests (no body)
*) Must be added before routes. Correct order:
app.use(express.json());
app.use("/api/v1/courses", courses);
*/

// this is for users table
const users = require("./routes/users");  // to implement sign-up api, save hashed pwd & token generation
app.use("/api/v1/users", users);

// this is for courses table
const courses = require("./routes/courses_db");
app.use("/api/v1/courses", courses);

app.use(errorHandler);  // this line should be added after app.use("/api/v1/courses", courses); since it should be executed only if next is called from controller

app.listen(PORT, () => {
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})

/*
For courses table:
1. Run the practice12db.js using command 'node practice12db.js'
2. Give 'GET/POST/PUT/DELETE' method in postman with route as http://localhost:5000/api/v1/courses
3. Hit 'Send' in postman

For users table:
1. Run the practice12db.js using command 'node practice12db.js'
2. Give 'POST' method in postman with route as http://localhost:5000/api/v1/users
3. Hit 'Send' in postman
4. You'll get response in postman as:
{
    "success": true,
    "data": {
        "message": "User created successfully"
    }
}
*/

/*
Logic behind server operation:
1. server app is created
2. logic is implemented using router
3. server app listens & opens port
4. user interacts with browser or postman & makes api calls
5. implemented logic is executed (defined in step 2)
*/

/*
courses table:
|----|-------|----------|
| id | title | duration |
|----|-------|----------|

users table:
|----|------|----------|----------|
| id | name | username | password |
|----|------|----------|----------|
*/