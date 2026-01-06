const express = require("express");
const router = express.Router();
const { verifyTokenHandler, verifyRoles } = require("../middlewares/jwtHandler");

const {getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require("../controllers/courses_db3");

router.get("/", [verifyTokenHandler], getCourses);

router.get("/:id", getCourse);

router.post("/", [verifyTokenHandler, verifyRoles(['admin'])], createCourse);
/*
1. run practice12_db.js
2. POST http://localhost:5000/api/v1/courses in POSTMAN with below json object in Body
{
  "title": "UX",
  "courseDuration": "2",
  "noOfSkills": 2
}

In Headers, Authorization value should be Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY0NDUzN30.TUV2lBLtnh9H1ObQSM3Xp9plaon9yEZDWUFK1lHzOGY
which belongs to userid=1 data. If userid=1 is having admin access, the new course can be created. If only user access is there, you will get below message in Response Body
message: "You do not have permission"
*/

// router.post("/", [verifyTokenHandler], createCourse);

router.put("/:id", updateCourse);

router.delete("/:id", deleteCourse);

//! If route is common, use below code
// router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);
// router.route("/").get(getCourses).post(createCourse);

module.exports = router;
