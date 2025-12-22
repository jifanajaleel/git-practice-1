//! Creating GET, POST, PUT, DELETE endpoints in express
import express from "express";
import dotenv from "dotenv";
dotenv.config({path: "./config/config.env"});

const app = express();  //! Creates an Express application instance. app is your server object
const PORT = process.env.PORT;

//! GET API
//! Run this code & then give GET http://localhost:5000 in postman. "Hello world" will be printed in Body section with status code as 200 if you uncomment res.send("<h1>Hello world</h1>")
app.get("/", (req, res) => {  //! Defines a GET API route. / means the root URL (http://localhost:5000 in here). This route runs when a GET request is made to /
    // res.send("<h1>Hello world</h1>");
    // res.send({
    //     id: 1,
    //     title: "NodeJs"
    // });
    // res.sendStatus(400);  // 400 Bad Request status will be printed
    // res.status(400).json({error:"Invalid email id"});  // 400 Bad Request status will be printed along with {error:"Invalid email id"} in the Body
    res.status(200).json({success:true, data:[{id:1, name:"Jifana"}]});
})

//! api to get a single course details is shown below
//! http://localhost:5000/api/v1/course. Give this link in postman
app.get("/api/v1/course", (req, res) => {  // req & res are objects. "/api/v1/course" is a route
    res.status(200).json({success:true, data:[{id:1, title:"NodeJS"}]});
})

//! http://localhost:5000/api/v1/course/<id>. You can try giving id as 1 or 2 or anything in postman
app.get("/api/v1/course/:id", (req, res) => {  // : denotes that id is dynamic
    console.log("Course id in GET:", req.params.id);
    res.status(200).json({success:true, data:{id: req.params.id, title:"Frontend Development"}});
})

//! POST API
app.post("/api/v1/course", (req, res) => {
    res.status(200).json({success:true, data:{id: 101, title:"Fullstack Development"}});
})

//! PUT API
app.put("/api/v1/course/:id", (req, res) => {
    console.log("Course id in PUT:", req.params.id);
    res.status(200).json({success:true, data:{id: req.params.id, title:"Backend Development"}});
})

//! DELETE API
app.delete("/api/v1/course/:id", (req, res) => {
    console.log("Course id in DELETE:", req.params.id);
    res.status(200).json({success:true, message:`Successfully deleted course with id : ${req.params.id}`});
})

app.listen(PORT, () => {  // Starts the server. Makes it listen for incoming requests on the given port
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})

/*
BASIC EXPLANATION FOR FIRST app.get()
1. Express creates the server
2. dotenv loads environment variables
3. app.get() defines routes
4. app.listen() starts the server
5. Server responds with JSON on /

What happens when you open the browser:
1. Visit: http://localhost:5000/
2. Express matches the / route
3. Sends the JSON response
4. Browser/Postman displays it
*/