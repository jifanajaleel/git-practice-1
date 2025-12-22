//! Creating controller file
// @desc     Get all courses
// @route    GET /api/v1/courses
// @access   public
const getCourses = (req, res, next) => {  //! Controllers have next so they can forward errors or control if needed
    // console.log("middleware reqStartTime:", req.reqStartTime)  // middleware things can be access from controllers/courses.js
    res.status(200).json({
        success:true, 
        data:[{id:1, title:"NodeJS!"}]
    });
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