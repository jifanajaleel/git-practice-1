//! Creating 2nd controller file
//! Connecting to database & fetching records from database

const pool = require("../config/courses_db");

// @desc     Get all courses
// @route    GET /api/v1/courses
// @access   public
const getCourses = (req, res, next) => {  // give http://localhost:5000/api/v1/courses in GET in postman
    pool.query("select id, title, duration from courses", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
    // res.status(200).json({success:true, data:[{id:1, title:"NodeJS!"}]});
}

// @desc     Get course by id
// @route    GET /api/v1/courses/:id
// @access   public
const getCourse = (req, res, next) => {
    res.status(200).json({success:true, data:{id: req.params.id, title:"Frontend Development!"}});
}

// @desc     Create new course
// @route    POST /api/v1/courses
// @access   public
const createCourse = (req, res, next) => {
    res.status(200).json({success:true, data:{id: 101, title:"Fullstack Development!"}});
}

// @desc     Update course by id
// @route    PUT /api/v1/courses/:id
// @access   public
const updateCourse = (req, res, next) => {
    res.status(200).json({success:true, data:{id: req.params.id, title:"Backend Development!"}});
}

// @desc     Delete course by id
// @route    DELETE /api/v1/courses/:id
// @access   public
const deleteCourse = (req, res, next) => {
    res.status(200).json({success:true, message:`Successfully deleted course with id : ${req.params.id}!`});
}

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}