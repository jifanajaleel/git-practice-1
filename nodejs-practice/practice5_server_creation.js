//! CREATING A SIMPLE SERVER USING NODEJS
// Suppose the scenario is: you are sending a request from browser to the server & getting response back from server to browser
// Server creation is not a one-time action. It is a continuous listening process
// import http from "http";  // This will work only if "type": "module" is added in package.json
// import dotenv from "dotenv";
const http = require("http");  // this line of code loads Node.js’s built-in HTTP module. This module lets you create servers, handle requests and responses
const dotenv = require("dotenv");  // dotenv is used to read environment variables from a .env or config.env file
dotenv.config({path: "./config/config.env"});  // here path of configuration file (env file) should be mentioned. This line loads environment variables from 'config/config.env' into process.env

const server = http.createServer((req, res) => {  // http.createServer() creates an HTTP server. It takes a callback function. This callback runs every time a client makes a request. Here req & res are objects
    console.log("Request received:", req);  // req contains url, http method, headers, body (if method is POST/PUT). Usually too big for real apps (used only for learning/debugging)
    const {url, method, headers} = req;
    console.log("url:", url);  // requested path (eg: /, /login, etc.)
    console.log("method:", method);  // HTTP method (GET, POST, etc.)
    console.log("headers:", headers); // request metadata (browser info, content type, etc.)
    // res.setHeader("Content-Type", "text/plain");  // shows raw text
    res.setHeader("Content-Type", "text/html");  // Tells the browser what kind of data you’re sending back. It could be text/plain or application/json
    res.write("<h1>Hello</h1>");  // Sends data to the client. You can call res.write() multiple times. Data is buffered until res.end() is called
    res.end();  // try commenting out this line and run to see the difference. If you comment this out, browser will keep loading forever. Request is never completed
});
//! The server does nothing yet. It is prepared, but not listening. At this stage, no port is open, no requests are accepted

// const PORT = 8080;  // Port where the server will listen. Default port number for 'http' is 80, for 'https' is 443. Here it means http://localhost:8080
const PORT = process.env.SERVER_PORT;  // PORT number (SERVER_PORT) will be fetched from config/config.env. Instead of hardcoding PORT, here we are calling PORT from config.env (that is the standard way)

//! below function (defined after PORT) is a callback function
server.listen(PORT, () => {  // Tells Node to start listening for requests. The callback runs once, when the server is ready
    console.log("Listening on:", PORT);
})
//! Your machine is now an active server

//! Either give http://localhost:8080 in postman GET method or try giving the link in browser address bar. Then only you will get the output in console and in the postman(check status code, body, header)

/* 
1. Run practice5_server_creation.js
2. Server starts listening & port is opened
3. Browser hits localhost:8080 Or postman uses GET method in http://localhost:8080
4. Callback (inside createServer) runs:
    req received
    Headers logged
    HTML sent
5. Browser renders Hello
6. Process ends
*/
