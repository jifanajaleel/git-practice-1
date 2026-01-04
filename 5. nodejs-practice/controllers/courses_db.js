//! Creating 2nd controller file
//! Connecting to database & fetching records from database

const pool = require("../config/courses_db");
const courseQueries = require("../queries/courses");

// @desc     Get all courses
// @route    GET /api/v1/courses
// @access   public
const getCourses = (req, res, next) => {  // give http://localhost:5000/api/v1/courses in GET in postman after running practice12_db.js
    // res.status(200).json({success:true, data:[{id:1, title:"NodeJS!"}]});  // this was the 1st code for testing. This is simply hardcoded

    // pool.query("select id, title, duration from courses", (error, results) => {  // pool.query() Gets a connection from the pool, Executes SQL, Releases the connection back to the pool
    //     if (error) throw error;
    //     res.status(200).json(results.rows);
    // })  // this was the 2nd code. It's not hardcoded. It takes data from database

    pool.query(courseQueries.getAllCourses, (error, results) => {  // pool.query() Gets a connection from the pool, Executes SQL, Releases the connection back to the pool
        if (error) throw error;
        console.log("Rows length:", results.rows.length);
        res.status(200).json(results.rows);
    })  // this is the final code
}

// @desc     Get course by id
// @route    GET /api/v1/courses/:id
// @access   public
const getCourse = (req, res, next) => {
    // res.status(200).json({success:true, data:{id: req.params.id, title:"Frontend Development!"}});

    const id = req.params.id;
    pool.query(courseQueries.getCourseById, [id], (error, results) => {  // 1st parameter in the array (id in here) will be passed to $1 of courseQueries.getCourseById. 2nd will be passed to $2 (if $ is defined in courseQueries.getCourseById) etc
        if (error) throw error;
        console.log("Row length:", results.rows.length);  // if we give some id which is not defined in db in the postman route, we will get the Row length as 0 in the console
        res.status(200).json(results.rows);  // if we give some id which is not defined in db in the postman route, response will be [] with 200 status code
    })
}

// @desc     Create new course
// @route    POST /api/v1/courses
// @access   public
const createCourse = (req, res, next) => {
    console.log("Request body:", req.body);  // it's output will be undefined if you comment app.use(express.json()); in practice12_db.js
    
    // res.status(200).json({success:true, data:{id: 101, title:"Fullstack Development!"}});  // this is hardcoded

    const {title, courseDuration} = req.body;  // object destructuring
    pool.query(courseQueries.addCourse, [title, courseDuration], (error, results) => {
        if (error) throw error;
        res.status(201).json({message: "Successfully added a new course"});
    })
    /*
    Run practice12_db.js. In postman, give method as POST, give route as http://localhost:5000/api/v1/courses, give body as below. And then Send
    {
        "title": "Java Backend Development",
        "courseDuration": 6
    }
    please note that 2nd element is courseDuration, not duration in here
    */
}

// @desc     Update course by id
// @route    PUT /api/v1/courses/:id
// @access   public
const updateCourse = (req, res, next) => {
    // res.status(200).json({success:true, data:{id: req.params.id, title:"Backend Development!"}});  //hardcoded

    const id = req.params.id;
    const {title, courseDuration} = req.body;
    pool.query(courseQueries.getCourseById, [id], (error, results) => {
        if (error) throw error;
        // const recordExists = results.rows.length > 0;
        if (results.rows.length) {  // if results.rows.length > 0, it'll be considered as True. 0 is equivalent to false
            pool.query(courseQueries.updateCourse, [title, courseDuration, id], (error, results) => {
            if (error) throw error;
            res.status(200).json({message: "Successfully updated a course"});
            })
        } else {
            res.status(404).json({message: `Course does not exist with id ${id}`});
        }
    })
}

// @desc     Delete course by id
// @route    DELETE /api/v1/courses/:id
// @access   public
const deleteCourse = (req, res, next) => {
    // res.status(200).json({success:true, message:`Successfully deleted course with id : ${req.params.id}!`});

    // const id = req.params.id;
    // pool.query(courseQueries.removeCourse, [id], (error, results) => {
    //     if (error) throw error;
    //     res.status(200).json({message: "Successfully removed a course"});
    // })
    /*
    First Run practice12_db.js. In postman, give method as DELETE, give route as http://localhost:5000/api/v1/courses/1. Then Send. The id=1 data will get deleted. Output response will be {message: "Successfully updated a course"}.
    Similarly, if you give http://localhost:5000/api/v1/courses/100 and then DELETE it, your output response will be still {message: "Successfully updated a course"} which is not correct as we don't have id=100 data in the database courses table.
    PUT will also have similar issue. Hence we need to Check whether record exist before update & delete. Below code is created for that
    */

    const id = req.params.id;
    pool.query(courseQueries.getCourseById, [id], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            pool.query(courseQueries.removeCourse, [id], (error, results) => {
            if (error) throw error;
            res.status(200).json({message: "Successfully removed a course"});
            })
        } else {
            res.status(404).json({message: `Course does not exist with id ${id}`});
        }
    })
}

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}