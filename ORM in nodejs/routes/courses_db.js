const express = require("express");
const router = express.Router();
const { verifyTokenHandler, verifyRoles } = require("../middlewares/jwtHandler");

const {getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require("../controllers/courses_db3");

router.get("/", [verifyTokenHandler], getCourses);

router.get("/:id", getCourse);

router.post("/", [verifyTokenHandler, verifyRoles(['admin'])], createCourse);

router.delete("/:id", deleteCourse);

module.exports = router;
