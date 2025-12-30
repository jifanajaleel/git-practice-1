//! Code Refactoring: DRY. Implementing Async handler function to wrap controller functions
//! Creating 5th controller file which is linked with repositories/courses.js
//! This is same as courses_db2.js controller file except that here we have done - Code Refactoring: DRY. Implementing Async handler function to wrap controller functions
//! In short, repeated code has been moved to middlewares/asyncHandler.js
//! here try-catch has been removed for making the code look neat & instead asyncHandler is used

const pool = require("../config/courses_db");
const courseQueries = require("../queries/courses");
const courseRepository = require("../repositories/courses");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc     Get all courses
// @route    GET /api/v1/courses
// @access   public
const getCourses = asyncHandler(async (req, res, next) => {  // asyncHandler executes the controller function -> Promise.resolve(fn(req, res, next)).catch(next);. If anything fails, automatically call next(error)
  const courses = await courseRepository.getAllCourses();
  res.status(200).json({ success: true, data: courses });  // if DB works fine, Controller sends response. Flow stop here
});  // if any error comes likeDB column typo or record not found or PostgreSQL error, then asyncHandler catches it. Error goes to errorHandler middleware

// @desc     Get course by id
// @route    GET /api/v1/courses/:id
// @access   public
const getCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const course = await courseRepository.getCourseById(id);
  if (course && course.length) {
    res.status(200).json({ success: true, data: course });
  } else {
    next(new ErrorResponse(`Course does not exist with id ${id}`, 404));  // here inside next, an ErrorResponse object is passed
    /*
    1. new ErrorResponse(...) creates a custom error object:
            {
              message: "Course does not exist with id 5",
              statusCode: 404
            }
    2. next(errorObject) tells Express that an error occurred — stop normal flow and go to error middleware
    3. Express immediately jumps to:
            const errorHandler = (error, req, res, next) => {
              res.status(error.statusCode || 500).json({
                message: error.message || "Server error"
              });
            };
    4. Client (Postman / browser) receives:
            {"message": "Course does not exist with id 5"}
       with HTTP status 404
    

    Difference between next(error) and next(new ErrorResponse()):
    -------------------------------------------------------------
    next(error):
    ------------
      *)Used for unexpected errors
      *)Usually comes from DB, syntax, runtime issues
      *)Status code often defaults to 500

    next(new ErrorResponse(message, code)):
    ---------------------------------------
     *)Used for expected errors
     *)Example:
      Record not found → 404
      Bad request → 400
      Unauthorized → 401
     *)You control the message and status
    */
  }
});

// @desc     Create new course
// @route    POST /api/v1/courses
// @access   public
const createCourse = asyncHandler(async (req, res, next) => {
  const { title, courseDuration } = req.body;
  const created = await courseRepository.createCourse(title, courseDuration);
  if (created) {
    res
      .status(201)
      .json({
        success: true,
        data: { message: "Course created successfully" },
      });
  }
});

// @desc     Update course by id
// @route    PUT /api/v1/courses/:id
// @access   public
const updateCourse = asyncHandler(async (req, res, next) => {
  const { title, courseDuration } = req.body;
  const id = req.params.id;
  const recordExist = await courseRepository.checkCourseExistsById(id);
  if (recordExist) {
    await courseRepository.updateCourse(id, title, courseDuration);
    res.status(200).json({ message: "Successfully updated a course" });
  } else {
    next(new ErrorResponse(`Course does not exist with id ${id}`, 404));
  }
});

// @desc     Delete course by id
// @route    DELETE /api/v1/courses/:id
// @access   public
const deleteCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const recordExist = await courseRepository.checkCourseExistsById(id);
  if (recordExist) {
    await courseRepository.deleteCourse(id);
    res.status(200).json({ message: "Successfully removed a course" });
  } else {
    next(new ErrorResponse(`Course does not exist with id ${id}`, 404));
  }
});

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
