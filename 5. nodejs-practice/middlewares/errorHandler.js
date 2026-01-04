//! Creating error-handler middleware
//! Code Refactoring: Creating custom error response

// if errorHandler middleware is added in practice12_db.js, after app.use("/api/v1/courses", courses); , it should be executed only if 'next()' is called from controller for handling errors
// you can test this by creating any spelling mistake in queries/courses.js, test postman GET with http://localhost:5000/api/v1/courses, hit Send in postman. Check response in postman
// usually middleware functions have req, res, next arguments. Only errorHandler has an additional error argument

const errorHandler = (error, req, res, next) => {
    console.log(error);
    // res.status(500).json({
    //     message: error.message
    // });
    res.status(error.statusCode || 500).json({  // if error.statusCode is not defined, 500 status code will be taken by default
        message: error.message || "Server error"
    });
}

module.exports = errorHandler;