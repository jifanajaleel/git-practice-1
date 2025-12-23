//! Creating server using express
//! https is a low-level (manual & detailed) method to create server. Express is high-level (easy & clean)

// import express from "express";  //! add "type":"module" in package.json to use import
// import dotenv from "dotenv"; 
const dotenv = require("dotenv"); //! used to read environment variables from a .env or config.env file
const express = require("express");  //! express is a library used to create servers easily, unlike http module. Express is a framework built on top of http
dotenv.config({path: "./config/config.env"});  //! loads environment variables from 'config/config.env' into process.env

const server = express();  // server created
const PORT = process.env.PORT || 9000;  // if the config.env file is not found, or PORT is not found in it, 9000 will be taken as default port

server.listen(PORT, () => {
    console.log(`Running in ${process.env.NODE_ENV} on ${PORT}`);
})

//! Run this code & then give GET http://localhost:5000 in postman or else run http://localhost:5000 in browser. Both will give error. Check updated code in pratice7_express.js