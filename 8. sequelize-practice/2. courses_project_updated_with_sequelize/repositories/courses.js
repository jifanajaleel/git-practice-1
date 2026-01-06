const Course = require("../models/course");

const getAllCourses = async () => {
  // Sequelize returns an array of Model instances
  const courses = await Course.findAll();  // findall() returns Promise<Array<Model>>
  return courses;   // Array<Course>
};

const getCourseById = async (id) => {
  // findByPk returns ONE object or null
  const course = await Course.findByPk(id);
  return course;   // this returns an object, not an array. An object will either have a value, or else have a null value
};

const createCourse = async (title, duration, noOfSkills) => {
  const course = await Course.create({
    title,
    duration,
    noOfSkills
  });
  return course;  // Sequelize model instance
};

// const checkCourseExistsById = (id) => {
//   return new Promise((resolve, reject) => {
//     Course.findByPk(id)
//     .then(course => {
//       console.log("course:", course)
//       resolve(true);
//     })
//     .catch(error => reject(false))
//   });
// };

const updateCourse = async (id, title, duration, noOfSkills) => {
  // Step 1: Check if course exists
  const course = await Course.findByPk(id);
  if (!course) 
    return false;
  await course.update({
    title,
    duration,
    noOfSkills
  });
  return true;
};

const deleteCourse = async (id) => {
  const course = await Course.findByPk(id);
  if (!course) 
    return false;
  await course.destroy();
  return true;
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
