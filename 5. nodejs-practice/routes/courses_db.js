//! Creating route file - 3rd method.
//! Connecting to database & fetching records from database

const express = require("express");  // remove "type":"module" from package.json to use require
const router = express.Router();  // router → mini Express app. Used to group related routes
const { verifyTokenHandler, verifyRoles } = require("../middlewares/jwtHandler");

/*
There are 4 methods explained (check below 4 lines). First uncomment courses_db line alone, then uncomment courses_db1 alone, then uncomment courses_db2 alone.
And finally uncomment courses_db3 alone
*/
// const {getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require("../controllers/courses_db");  // importing controller functions. Keeps routing logic clean. Actual logic lives in controllers
// const {getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require("../controllers/courses_db1");  // this is uncommented to check database operation and repository functionality. If above line is uncommented, database operation without repository can be learned
// const {getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require("../controllers/courses_db2");  // this db2 file is same as db1. Only change is that code refactoring has been done for this db2 file with try-catch & errorHandler middleware also added
const {getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require("../controllers/courses_db3");  // this db3 file is same as db2. Only change is that code refactoring has been done for this db3 file for DRY(Don't Repeat Yourself). Implemented Async handler function to wrap controller functions

// router.get("/", getCourses);
router.get("/", [verifyTokenHandler], getCourses);

router.get("/:id", getCourse);

// router.post("/", createCourse);
router.post("/", [verifyTokenHandler, verifyRoles(['admin'])], createCourse);  // verifyRoles -> if user has admin role, then only createCourse function is executed

router.put("/:id", updateCourse);

router.delete("/:id", deleteCourse);

//! If route is common, use below code
// router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse); // use this line of code instead of using get, put, delete separately on "/:id"
// router.route("/").get(getCourses).post(createCourse);

module.exports = router;