const pool = require("../config/courses_db");
const courseQueries = require("../queries/courses");
const Course = require("../models/course");

const getAllCourses = () => {
  return new Promise((resolve, reject) => {
    pool.query(courseQueries.getAllCourses, (error, results) => {
      if (error) {
        reject(error);
      } else {
        let courses = [];
        for (let r of results.rows) {
          courses.push(new Course(r.id, r.title, r.duration));
        }
        resolve(courses);
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
        resolve(true);
      }
    });
  });
};

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

const updateCourse = (id, title, duration) => {
  return new Promise((resolve, reject) => {
    pool.query(courseQueries.updateCourse, [title, duration, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
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
        resolve(results.rows);
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
