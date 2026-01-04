//! Building a page using ejs template engine (EJS-Embedded JavaScript templating)

const express = require("express");
const dotenv = require("dotenv");

dotenv.config({path: "./config/config.env"});
const PORT = process.env.PORT || 9000;

const app = express();
app.set("view engine", "ejs");  // ejs is the template engine. Tells Express: “I am using EJS as my template engine”. Looks for templates inside the views/ folder

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

app.use(logger);

app.use(express.static("public"));  // Makes public/ folder accessible in browser

app.use(express.json());

// this is for users table
const users = require("./routes/users");  // to implement sign-up api, save hashed pwd & token generation
app.use("/api/v1/users", users);

// this is for courses table
const courses = require("./routes/courses_db");
app.use("/api/v1/courses", courses);

app.use(errorHandler);  // Runs only if next(error) is called

app.get("/home", (req, res) => { // Check http://localhost:5000/home in browser after running practice14_ejs.js   
    // res.render("home")  // here "home" means this file is views/home.ejs. Here we are rendering a template basically. This line is simply rendering template, not mixing any json data with template to convert to html
    var offerProduct = {  // Creating a JS object to send to EJS template
        title: "Adidas Sports Shoe",
        offerPerc: 80
    }
    var offerCategories = [  // Array of categories
        "Electronics",
        "Fashion"
    ]
    res.render("home", {  //  This line is rendering template, and mixing json data with template to convert to html. By default, it will understand that home file lies within views
        product: offerProduct,
        offerCategories: offerCategories
    });
})
/*
What this res.render() does:
----------------
*) Takes views/home.ejs
*) Injects data into it
*) Converts it into HTML
*) Sends HTML to browser

Introduction to template engines in express (nodejs express ejs):
-----------------------------------------------------------------
*) Even though usually nodejs & express are used to develop backend & api only. front end can be developed using nodejs as well using ejs template (full stack)
*) ejs (similar to html) is a template engine. pug is another template engine. Both ejs & pug are supported by express
*) Basically, full stack can be achieved using nodejs, express & ejs template

Template engine responsibility :
---------------------------------
*) json+template -> pure html aayi convert cheyth -> send to browser. This is what happens usually
*) json data is mixed with template to convert into pure html
*) json data+template -> pure html aayi convert cheyyuka is the responsibility of template engine
*/

app.listen(PORT, () => {
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})
