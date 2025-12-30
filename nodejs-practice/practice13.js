//! cors, multer, path, fs configuration for file upload & download

//! Connecting to database & fetching records from database
const express = require("express");
const dotenv = require("dotenv");

//! Configuring CORS in NODEjs API
var cors = require("cors");  // Check git-practice-1\html-practices\html01\index.html where cors is utilized
/* 
cors is a middleware in Node.js (Express) that controls Cross-Origin Resource Sharing.
Browsers block requests made from one origin (domain/port) to another origin for security reasons.
Example:
Frontend → http://localhost:3000
Backend → http://localhost:5000
This is cross-origin, so the browser blocks it unless CORS is enabled.
*/

//! Multer middleware
const multer = require("multer");  // multer is a Node.js middleware used in Express applications to handle file uploads. Multer helps your server receive files (images, PDFs, videos, etc.) that are sent from the client using multipart/form-data (the format used when uploading files from forms or Postman)

//! Download file using nodejs
const fs = require("fs");  // file system. Used to work with files (check if a file exists, read files, write files, etc)
const path = require("path");  // path helps build safe file paths. Avoids problems with / vs \ on different operating systems

dotenv.config({path: "./config/config.env"});

const app = express();

var corsOptions = {
    origin: "http://127.0.0.1:5500"
}  // here we are configuring only above http link to access (or fetch) the api. We can give multiple links
app.use(cors(corsOptions));  // cors is a middleware. If corsOptions is not defined, you can directly use app.use(cors()); -> This allows all origins to access your API (default behavior)

const PORT = process.env.PORT || 9000;
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

app.use(logger);

app.use(express.static("public"));  // this is a middleware
/*
Configuring static files directory in nodejs:
---------------------------------------------
All files inside public folder will be considered as static files. Default port mentioned in env file is 5000
1. if you run this practice12_db code and load http://localhost:5000/index.html in browser, you could see the index.html running there. If you comment above line, http://localhost:5000/index.html will be be error
2. load http://localhost:5000/baby.jpg
*/

app.use(express.json());

// this is for users table
const users = require("./routes/users");  // to implement sign-up api, save hashed pwd & token generation
app.use("/api/v1/users", users);

// this is for courses table
const courses = require("./routes/courses_db");
app.use("/api/v1/courses", courses);

//! multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {  // cb means callback. destination means destination of file storage
        cb(null, "profilePhotos");
    },
    filename: (req, file, cb) => {  // configuring filename if same file names are uploaded by users
        const fileName = Date.now() + "_" + file.originalname;
        cb(null, fileName);
    }
})
const upload = multer({storage: storage});

//! Uploading file using multer
// instead of using routes file, i am using below line directly as it does not need to create a separate route file
app.post("/profile", upload.single("profileImage"), (req, res) => {  // here profileImage is the name provided in public/index.html's input name, defined inside form
    res.status(200).json("File uploaded successfully");
})
//! Handling multiple file uploads in nodejs
app.post("/profiles", upload.array("productImages", 5), (req, res) => {  // max 5 files are supported. array is used to support multiple files
    res.status(200).json("Files uploaded successfully");
})
/*
1. Run public/index.html with Live server
2. Upload any file in the browser
3. Make sure to create a folder named profilePhotos to get the file uploaded in there
*/

//! Download file using nodejs
app.get("/api/sales-report/pdf", (req, res) => {  // normal GET api creation in http://localhost:5000/api/sales-report/pdf
    const reportFilePath = path.join(__dirname, "reports/sales-report.pdf");  // __dirname → current folder of this JS file. path.join() safely joins folders and file name
    const exist = fs.existsSync(reportFilePath);  // returns true or false
    if (exist == true) {
        res.setHeader("Content-Type", "application/pdf");  // Tells the browser that this response is a PDF file
        res.setHeader("Content-Disposition", "attachment; filename=" + "todays-sales-report.pdf");  // attachment → forces download instead of opening in browser. filename → name shown in download dialog
        fs.createReadStream(reportFilePath).pipe(res);  // Reads the file as a stream. Sends it chunk by chunk to the client. Very efficient for large files. pipe(res) sends file data directly into the HTTP response
    } else {
        res.status(404).json({message: "Report not available"});
    }
    })
/*
give http://localhost:5000/api/sales-report/pdf in postman or browser, the file will get downloaded.

1. Client calls GET /api/sales-report/pdf
2. Server checks if sales-report.pdf exists
3. If exists:
    Sets PDF headers
    Forces download
    Streams the file
4. If not exists:
    Returns 404 JSON error
*/

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})
