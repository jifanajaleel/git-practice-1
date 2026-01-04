//! Creating route file - 2nd method or updated method of course.js
// This is linked with practice9_routing.js & practice10_routing.js
// Routing configurations of Courses only will be there in this js file
// Use postman for testing this - http://localhost:5000/api/v1/courses/5

const express = require("express");  // remove "type":"module" from package.json to use require
const router = express.Router();  // router → mini Express app. Used to group related routes
const {getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require("../controllers/courses");  // importing controller functions. Keeps routing logic clean. Actual logic lives in controllers

router.get("/", getCourses);  // GET /api/v1/courses. Calls getCourses controller

router.get("/:id", getCourse);

router.post("/", createCourse);

router.put("/:id", updateCourse);

router.delete("/:id", deleteCourse);

//! If route is common, use below code
// router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse); // use this line of code instead of using get, put, delete separately on "/:id"
// router.route("/").get(getCourses).post(createCourse);

module.exports = router;