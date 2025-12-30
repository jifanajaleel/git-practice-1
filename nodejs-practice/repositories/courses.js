//! Refactoring code: Moving DB interaction logic to repositories
//! A repository does not need to know anything about requests & responses. It just need to handle database interactions

const { duration } = require("moment");
const pool = require("../config/courses_db");
const courseQueries = require("../queries/courses");

const getAllCourses = () => {
  return new Promise((resolve, reject) => {
    // if we don't use promise concept in here, this getAllCourses function will return void datatype if you check in controllers/courses_db1.js
    pool.query(courseQueries.getAllCourses, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getCourseById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(courseQueries.getCourseById, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const createCourse = (title, duration) => {
  return new Promise((resolve, reject) => {
    pool.query(courseQueries.addCourse, [title, duration], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);  // it means the course was successfully created. That’s all the controller needs to know. Your controller already sends a fixed success message. res.status(201).json({ message: "Successfully created a course" });. So returning true is simple, clear, and sufficient
      }
    });
  });
};

// answer for the below function should be simply true or false
// checkCourseExistsById is a boolean helper. That’s why it always resolves, never rejects. Two resolve() calls handle different outcomes
// Why two resolve() calls? - Because “exists” and “does not exist” are NOT errors
const checkCourseExistsById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(courseQueries.getCourseById, [id], (error, results) => {
      if (error) {
        resolve(false);
      } else {
        resolve(results.rows.length > 0);
      }
    });
  });
};
/*
|-------------------------|------------------|
|        Situation        |       Use        |
|-------------------------|------------------|
|DB connection/query error|reject(error)     |
|Record exists	          |resolve(true)     |
|Record does not exist	  |resolve(false)    |
|Update/Delete success	  |resolve(results)  |
|-------------------------|------------------|
*/

const updateCourse = (id, title, duration) => {
  return new Promise((resolve, reject) => {
    pool.query(
      courseQueries.updateCourse,
      [title, duration, id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);  // here resolve(true); can be used instead of this line
        }
      }
    );
  });
};

const deleteCourse = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(courseQueries.removeCourse, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);  // here resolve(true); can be used instead of this line
      }
    });
  });
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  checkCourseExistsById,
  updateCourse,
  deleteCourse,
};
