//! Refactoring code: Moving DB interaction logic to repositories
//! Creating 3rd controller file which is linked with repositories/courses.js
//! controller does not need to know database interactions. That's why those code has been moved to repositories/courses.js
//! controller is only responsible to handle requests & responses

const pool = require("../config/courses_db");
const courseQueries = require("../queries/courses");
const courseRepository = require("../repositories/courses");

// @desc     Get all courses
// @route    GET /api/v1/courses
// @access   public
const getCourses = (req, res, next) => {
  courseRepository.getAllCourses().then(
    (data) => {
      res.status(200).json(data);
    },
    (error) => {
      res.status(500).json({ message: error.message }); // if you unknowingly type 'titl' in queries/courses.js getAllCourses, and then hit GET http://localhost:5000/api/v1/courses in postman, you will get 500 internal error as status code and also you'll get response as {"message": "column \"titl\" does not exist"}
    }
  );
};

// @desc     Get course by id
// @route    GET /api/v1/courses/:id
// @access   public
const getCourse = (req, res, next) => {
  const id = req.params.id;
  courseRepository.getCourseById(id).then(
    (data) => {
      res.status(200).json(data);
    },
    (error) => {
      res.status(500).json({ message: error.message });
    }
  );
};

// @desc     Create new course
// @route    POST /api/v1/courses
// @access   public
const createCourse = (req, res, next) => {
  const { title, courseDuration } = req.body;
  courseRepository.createCourse(title, courseDuration).then(
    (data) => {
      res.status(201).json({ message: "Successfully created a course" });
    },
    (error) => {
      res.status(500).json({ message: error.message });
    }
  );
};

// @desc     Update course by id
// @route    PUT /api/v1/courses/:id
// @access   public
const updateCourse = async (req, res, next) => {
  const { title, courseDuration } = req.body;
  const id = req.params.id;
  const recordExist = await courseRepository.checkCourseExistsById(id);
  if (recordExist) {
    courseRepository.updateCourse(id, title, courseDuration).then(
      (data) => {
        res.status(200).json({ message: "Successfully updated a course" });
      },
      (error) => {
        res.status(500).json({ message: error.message });
      }
    );
  } else {
    res.status(404).json({ message: `Course does not exist with id ${id}` });
  }
};

// @desc     Delete course by id
// @route    DELETE /api/v1/courses/:id
// @access   public
const deleteCourse = async (req, res, next) => {
  const id = req.params.id;
  const recordExist = await courseRepository.checkCourseExistsById(id);
  if (recordExist) {
    courseRepository.deleteCourse(id).then(
      (data) => {
        res.status(200).json({ message: "Successfully removed a course" });
      },
      (error) => {
        res.status(500).json({ message: error.message });
      }
    );
  } else {
    res.status(404).json({ message: `Course does not exist with id ${id}` });
  }
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
