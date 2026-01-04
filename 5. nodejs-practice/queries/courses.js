//! Fetching single record by id from database
//! all course related queries can be kept in this file

const getAllCourses = "SELECT id, title, duration FROM courses";  // SELECT returns Array<Object>
const getCourseById = "SELECT id, title, duration FROM courses WHERE id = $1";  // for postgresql, parameters are defined with '$'
const addCourse = "INSERT INTO courses(title, duration) VALUES($1, $2)";  // INSERT returns empty array & does not return rows unless you use RETURNING
const updateCourse = "UPDATE courses set title=$1, duration=$2 WHERE id=$3";  // UPDATE returns empty array & does not return rows unless you use RETURNING
const removeCourse = "DELETE FROM courses where id=$1";  // DELETE returns empty array & does not return rows unless you use RETURNING

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    removeCourse
};
