//! Creating route file
// This is linked with practice8_routing.js
// Routing configurations of Course only will be there in this js file
// Use postman for testing this - http://localhost:5000/api/v1/course/5

const express = require("express");  // remove "type":"module" from package.json to use require
const router = express.Router();  // creates a router object. router is used to define routes separately

router.get("/", (req, res) => {  // req & res are objects. "/api/v1/course" is a route. Here http link would be http://localhost:5000/api/v1/course
    res.status(200).json({success:true, data:[{id:1, title:"NodeJS"}]});
})

router.get("/:id", (req, res) => {  // : denotes that id is dynamic. Use any id after course in http://localhost:5000/api/v1/course, that'll be your req.params.id
    console.log("Course id in GET:", req.params.id);
    res.status(200).json({success:true, data:{id: req.params.id, title:"Frontend Development"}});
})

router.post("/", (req, res) => {
    res.status(200).json({success:true, data:{id: 101, title:"Fullstack Development"}});
})

router.put("/:id", (req, res) => {  // Here http link would be http://localhost:5000/api/v1/course/6. Give any number instead of 6
    console.log("Course id in PUT:", req.params.id);
    res.status(200).json({success:true, data:{id: req.params.id, title:"Backend Development"}});
})

router.delete("/:id", (req, res) => {
    console.log("Course id in DELETE:", req.params.id);
    res.status(200).json({success:true, message:`Successfully deleted course with id : ${req.params.id}`});
})

module.exports = router;