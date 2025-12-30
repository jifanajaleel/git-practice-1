//! Code Refactoring: DRY. Implementing Async handler function to wrap controller functions

const asyncHandler = (fn) => {  // fn = your controller function (which will be async). eg: getCourses
    return (req, res, next) => {  // asyncHandler returns a new function. The returned function (req, res, next) is what Express actually executes
        return Promise.resolve(fn(req, res, next))  // Promise.resolve(fn(...)) ensures your async function is treated as a Promise
            .catch(next);  // if there’s an error inside your async controller function, it automatically calls next(error), which sends the error to your error-handling middleware (errorHandler.js)
    }
}

module.exports = asyncHandler;

/*
*) asyncHandler wraps async controller functions and automatically forwards errors to Express error middleware without using try–catch everywhere. asyncHandler automatically catches any errors in your async function and passes them to Express's next() function
*) Express always expects route handlers like this:
    (req, res, next) => {}
   So asyncHandler wraps your function
*) Async functions always return a Promise
*) In Express, when you write async functions (functions that use await) in your routes/controllers, you need to catch errors manually

Example without asyncHandler:
const getCourses = async (req, res, next) => {
    try {
        const courses = await courseRepository.getAllCourses();
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        next(error);  // you have to do this for EVERY async controller
    }
};

Works fine, but if you have 10 controllers, adding try-catch everywhere is repetitive. This is called repetitive code (DRY violation)

Think of asyncHandler as a wrapper for async controller functions. It automatically catches any errors in your async function and passes them to Express's next() function

Example with asyncHandler:
const getCourses = asyncHandler(async (req, res, next) => {
  const courses = await courseRepository.getAllCourses();
  res.status(200).json({ success: true, data: courses });
});

*) You don’t need a try-catch inside getCourses
*) If getAllCourses() fails (database error, etc.), asyncHandler automatically catches it and passes it to next(error)
*) Your errorHandler.js will then send a proper response to the client

Flow diagram:
Client (Postman / Browser)
        |
        v
HTTP Request
(GET /api/v1/courses)
        |
        v
Express Router
        |
        v
Controller wrapped with asyncHandler
(getCourses, getCourse, etc.)
        |
        v
asyncHandler(fn)
        |
        v
----------------------------------
| Controller Logic Runs           |
|                                  |
| await DB call                    |
|                                  |
|  ✔ Success        ❌ Error       |
----------------------------------
        |                   |
        |                   |
        v                   v
res.json(...)        Error thrown / Promise rejected
 (200 / 201)                  |
                               v
                         asyncHandler catches error
                               |
                               v
                          next(error)
                               |
                               v
                   errorHandler middleware
                               |
                               v
                res.status(error.statusCode || 500)
                      .json({ message })
                               |
                               v
                          Client Response

*/