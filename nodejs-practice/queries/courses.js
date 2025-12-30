//! Fetching single record by id from database
//! all course related queries can be kept in this file

const getAllCourses = "SELECT id, title, duration FROM courses";
const getCourseById = "SELECT id, title, duration FROM courses WHERE id = $1";  // for postgresql, parameters are defined with '$'
const addCourse = "INSERT INTO courses(title, duration) VALUES($1, $2)";
const updateCourse = "UPDATE courses set title=$1, duration=$2 WHERE id=$3";
const removeCourse = "DELETE FROM courses where id=$1";

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    removeCourse
};
