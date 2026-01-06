const courseRepository = require("../repositories/courses");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc     Get all courses
// @route    GET /api/v1/courses
// @access   public
const getCourses = asyncHandler(async (req, res, next) => {
  const courses = await courseRepository.getAllCourses();
  res.status(200).json({ 
    success: true, 
    count: courses.length, 
    data: courses });
});

// @desc     Get course by id
// @route    GET /api/v1/courses/:id
// @access   public
const getCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const course = await courseRepository.getCourseById(id);
  if (course) {
    res.status(200).json({ 
      success: true, 
      data: course
    });
  } else {
    next(new ErrorResponse(`Course does not exist with id ${id}`, 404));
  }
});

// @desc     Create new course
// @route    POST /api/v1/courses
// @access   public
const createCourse = asyncHandler(async (req, res, next) => {
  const { title, courseDuration, noOfSkills } = req.body;
  if (!title || !courseDuration) {
    return next(new ErrorResponse("Title and duration are required", 400));
  }
  const course = await courseRepository.createCourse(
    title,
    courseDuration,
    noOfSkills
  );
  res.status(201).json({
    success: true,
    message: "Course created successfully"
  });
});

// @desc     Update course by id
// @route    PUT /api/v1/courses/:id
// @access   public
const updateCourse = asyncHandler(async (req, res, next) => {
  const { title, courseDuration, noOfSkills } = req.body;
  const id = req.params.id;
  const updated = await courseRepository.updateCourse(id, title, courseDuration, noOfSkills);
  if (updated) {
    res.status(200).json({
      success: true,
      message: "Course updated successfully" });
  } else {
    next(new ErrorResponse(`Course does not exist with id ${id}`, 404));
  }
});

// @desc     Delete course by id
// @route    DELETE /api/v1/courses/:id
// @access   public
const deleteCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const deleted = await courseRepository.deleteCourse(id);
  if (deleted) {
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
