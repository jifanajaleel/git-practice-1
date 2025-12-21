//! Import in js
// to use import/export, make sure to update package.json with "type": "module"
// practice4.js imports functions from date-util.js
import today, { getDateDDDMMYY, convertDateToDDMMMYYYY } from './date-util.js';  // default function can be put outside the braces
import fs from 'fs';  // file system

console.log("convertDateToDDMMMYYYY function output:", convertDateToDDMMMYYYY(new Date(2023,7,5)));
console.log("today function output:", today());

//! Asynchronous functions
// setTimeout is a callback function
setTimeout(() => {
    console.log("From setTimeout")
}, 0);  // even though 0 is the time given in here, setTimeout will be executed after printing "After setTimeout" from below line

console.log("After setTimeout");

//! To read content from a txt file in synchronous mode
// below code is called blocking code as this could block the further executions if data.txt is too large since this is a synchronous operation
var content = fs.readFileSync("data.txt");
console.log("Plain content:", content);  // this will give Buffer
console.log("After conversion to string in synch fn:", content.toString());
console.log("After synchronous fn");
// same alternatice non blocking code is defined below

//! To read content from a txt file in asynchronous mode
//! Callback function
// non blocking code
fs.readFile("data.txt", (err, data) => {  // here the arrow fn is a callback fn. After reading file content from data.txt, the callback fn will get executed
    if (err) {
        console.log("Something failed:", err);  // try giving file name as data1.txt inside fs.readFile(), you will see this block getting executed
        return;
    }
    console.log("After conversion to string in asynch fn:", data.toString());
})
console.log("After asynchronous fn");