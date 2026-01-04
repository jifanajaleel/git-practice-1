const courseRepository = require("../repositories/courses");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");  // To create custom error response

// @desc     Get all courses
// @route    GET /api/v1/courses
// @access   public
const getCourses = asyncHandler(async (req, res, next) => {
  const courses = await courseRepository.getAllCourses();  // courses is Array<Object>. Check what repository getCourses function is returning
  res.status(200).json({ success: true, data: courses });
});

// @desc     Get course by id
// @route    GET /api/v1/courses/:id
// @access   public
const getCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const course = await courseRepository.getCourseById(id);  // course is Array<Object>. It'll have only 1 element
  if (course && course.length) {
    res.status(200).json({ success: true, data: course });
  } else {
    next(new ErrorResponse(`Course does not exist with id ${id}`, 404));  // here inside next, an ErrorResponse object is passed
  }
});

// @desc     Create new course
// @route    POST /api/v1/courses
// @access   public
const createCourse = asyncHandler(async (req, res, next) => {
  const { title, courseDuration } = req.body;
  const created = await courseRepository.createCourse(title, courseDuration);
  if (created) {
    res.status(201).json({
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
