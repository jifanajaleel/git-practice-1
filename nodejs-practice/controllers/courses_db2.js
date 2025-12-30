//! Refactoring code: Moving DB interaction logic to repositories
//! Creating 4th controller file which is linked with repositories/courses.js
//! This is same as courses_db1.js controller file except that here we have done - Code Refactoring: Wrapping controller functions with try-catch in here

const pool = require("../config/courses_db");
const courseQueries = require("../queries/courses");
const courseRepository = require("../repositories/courses");
const ErrorResponse = require("../utils/errorResponse");

// @desc     Get all courses
// @route    GET /api/v1/courses
// @access   public
const getCourses = async (req, res, next) => {  // req → request data (body, params, headers)
    try {
        const courses = await courseRepository.getAllCourses();
        res.status(200).json({success: true, data: courses});
    } catch (error) {
        // res.status(500).json({message: error.message});  // if you unknowingly type 'titl' in queries/courses.js getAllCourses, and then hit GET http://localhost:5000/api/v1/courses in postman, you will get 500 internal error as status code and response will be {"message": "column \"titl\" does not exist"}
        next(error);  //! Created error-handler middleware in practice12_db.js. Hence this line of code will work perfectly
    }
};

// @desc     Get course by id
// @route    GET /api/v1/courses/:id
// @access   public
const getCourse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const course = await courseRepository.getCourseById(id);
        res.status(200).json({success: true, data: course});
    } catch (error) {
        next(error);
    }
};

// @desc     Create new course
// @route    POST /api/v1/courses
// @access   public
const createCourse = async (req, res, next) => {
    const {title, courseDuration} = req.body;
    try {
        const created = await courseRepository.createCourse(title, courseDuration);  // if the repository resolves, 'true' will be received. If repository rejects, the control jumps to catch
        if (created) {  // 'created' exists only if resolve happens from courseRepository.createCourse. reject never returns a value. Actually this line is optional, not manadatory since if error is there, catch block will be executed
            res.status(201).json({success: true, data: {message: "Course created successfully"}});  // only this line of code is needed without if statement
        }        
    } catch (error) {
        next(error);  // in this try-catch method, we cannot define other kind of errors. Only, 500 status code will be printed. Other errors with status code 404 cannot be defined or tracked. For that utils/errorResponse.js is used. Check updateCourse & deleteCourse
    }
};
/*
*) createCourse() in repository returns a Promise
*) If DB insert is successful → Promise resolves
*) If DB insert fails → Promise rejects (throws error)
*) Because of await:
    resolve(value) → created = value
        reject(error) → jumps directly to catch
*/

// @desc     Update course by id
// @route    PUT /api/v1/courses/:id
// @access   public
const updateCourse = async (req, res, next) => {
    const {title, courseDuration} = req.body;
    const id = req.params.id;
    try {
        const recordExist = await courseRepository.checkCourseExistsById(id);
        if (recordExist) {
            await courseRepository.updateCourse(id, title, courseDuration);
            res.status(200).json({message: "Successfully updated a course"});
        } else {
            next(new ErrorResponse(`Course does not exist with id ${id}`, 404));
        }
    }
    catch (error) {
        next(error);
    }
};

// @desc     Delete course by id
// @route    DELETE /api/v1/courses/:id
// @access   public
const deleteCourse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const recordExist = await courseRepository.checkCourseExistsById(id);
        if (recordExist) {
            await courseRepository.deleteCourse(id);
            res.status(200).json({message: "Successfully removed a course"});
        } else {
            next(new ErrorResponse(`Course does not exist with id ${id}`, 404));
        } 
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}

/*
Client (Postman / Browser)
        |
        v
   Express Route
        |
        v
   Controller (try-catch)
        |
        v
   Repository (DB logic)
        |
        v
   PostgreSQL Database
        |
        v
   Repository (returns result / throws error)
        |
        v
   Controller
        |
        |-- success --> JSON Response
        |
        |-- error ----> next(error)
                            |
                            v
                   Error Handling Middleware
                            |
                            v
                      Error Response
*/