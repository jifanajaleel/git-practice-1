//! Using route file & controller file along with Middleware
// This is linked with routes/courses.js
// remove "type":"module" from package.json to use require
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});

const app = express();
const PORT = process.env.PORT || 9000;

//! Middleware function
// Middleware can both view and update requests & responses
/*
1. This is a custom middleware
2. req → request object & res → response object
3. next() → passes control to the next middleware or route. a function that tells Express “go to next step”
4. Without next() → request will hang. If you remove next(), Browser/Postman will keep loading forever & Controller will never run
5. Think of it as below:
    Client (Postman / Browser)
        ↓
    Middleware
        ↓
    Route
        ↓
    Controller
        ↓
    Response
6. What exactly does this middleware DO?
an) It does NOT send a response. It only 
    *) Reads request details
    *) Logs information
    *) Passes control forward
7. Why middleware is used in real apps? 
    ✔ Logging
    ✔ Authentication (JWT check)
    ✔ Authorization
    ✔ Validation
    ✔ Error handling
8. One-line summary - Middleware is a function that runs before routes, can read/modify requests, and must call next() to continue
*/
const logger = (req, res, next) => {  // logger is the middleware function in here
    // console.log("Request received:", req);
    console.log(`Request url received: ${req.url}`);
    console.log(`Request received in detail: ${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);
    // req.reqStartTime = Date.now();  // here reqStartTime object is getting attached with req. middleware things can be access from controllers/courses.js
    next();
}

app.use(logger); // Registers the middleware globally. Runs for all routes & all HTTP methods

// try giving http://localhost:5000/api/v1/courses & http://localhost:5000/api/v1/courses/230 in GET/POST/PUT/DELETE method in postman & check the console

const courses = require("./routes/courses");
app.use("/api/v1/courses", courses);

app.listen(PORT, () => { 
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})