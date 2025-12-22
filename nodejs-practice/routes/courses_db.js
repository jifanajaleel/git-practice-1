//! Creating route file - 3rd method

const express = require("express");  // remove "type":"module" from package.json to use require
const router = express.Router();  // router → mini Express app. Used to group related routes
const {getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require("../controllers/courses_db");  // importing controller functions. Keeps routing logic clean. Actual logic lives in controllers

router.get("/", getCourses); 

router.get("/:id", getCourse);

router.post("/", createCourse);

router.put("/:id", updateCourse);

router.delete("/:id", deleteCourse);

//! If route is common, use below code
// router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse); // use this line of code instead of using get, put, delete separately on "/:id"
// router.route("/").get(getCourses).post(createCourse);

module.exports = router;