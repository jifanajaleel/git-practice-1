/* ********************************** IMPORT FUNCTIONS from other js files ********************************** */
// remove "type":"module" from package.json to use require
var addTwoNum = require('./math_functions');  // imports math_functions.js
var res = addTwoNum(2,3);
console.log("addTwoNum result is : ", res);

/* ********************************** INTRO TO OOP IN JS ********************************** */
/* **************************************** CLASS **************************************** */
// A class is a template for creating objects
class Student {
    id = 0;
    name = "";
    course = "";
    level1TestScores = [];

    constructor(_id, _name, _course, _level1TestScores) {  // constructor is a special function to create objects easily
        this.id = _id;
        this.name = _name;
        this.course = _course;
        this.level1TestScores = _level1TestScores;
    }

    calculateAvgScore = () => {
        var sum = 0;
        for (var score of this.level1TestScores) {
            sum = sum + score;         
        }
        return sum / this.level1TestScores.length;
    };

    calculateHighestScore = () => {
        //
    };

    getPerformance = () => {
        //
    };
}

// student1 object creation from class Student
var student1 = new Student();
student1.id = 1;
student1.name = "Ayan";
student1.course = "Backend";
student1.level1TestScores = [99, 98, 97];
console.log("type of student1 : ", typeof(student1));
console.log("student1 : ", student1);

// student2 object creation from class Student's constructor function. This is an easy way to create objects as compared to above way
var student2 = new Student(2, "Beena", "Frontend", [80, 89, 78]);
console.log("student2 : ", student2);

// student2 object's course updation can be done using dot
student2.course = "Full-stack";
console.log("student2 after updating course : ", student2);

console.log("student1.calculateAvgScore() : ", student1.calculateAvgScore());
console.log("student2.calculateAvgScore() : ", student2.calculateAvgScore());

/* ********************************** OBJECT DESTRUCTURING ********************************** */
var member1 = {
    name: "Diya",
    course: "Full stack"
}
var name = member1.name;
var course = member1.course;
console.log("name & course:", name, course);

// Instead of doing as above, we can use object destructuring as shown below
var {name, course} = member1;  // here we are creating variables from an object
console.log("name & course after object destructuring:", name, course);

// object destructuring another example
var member2 = {
    name: "Hina",
    course: {
        name: "UI",
        duration: "6months"
    }
}
var {name, course: {duration}} = member2;
name = "ABC";
console.log("object destructuring: ", member2, name, duration);

/* ********************************** OBJECT LITERAL ENHANCEMENT ********************************** */
// The opposite operation of object destructuring can be done now, i.e, creating an object from variables
var productName = "iPhone 14";
var price = 85000;
var product = {
    productName,
    price
}
console.log("object created from variables:", product);

/* ********************************** ARRAY DESTRUCTURING ********************************** */
var rankHolders = ["Samuel", "James", "Aryan", "David"];
var [firstRankHolder, secondRankHolder, ...others] = rankHolders;  // rest operator
var [,,thirdRankHolder] = rankHolders;
console.log("firstRankHolder, secondRankHolder, others after array destructuring:", firstRankHolder, secondRankHolder, others);
console.log("thirdRankHolder:", thirdRankHolder);
// If the array has fewer elements than the variables, the remaining variables will be assigned a value of undefined
// Also we can skip elements by leaving an empty space for them inside the square brackets on the left side of the assignment

/* ********************************** JS SCHEDULING-setTimeout ********************************** */
// Used to run a function once after a specified delay

console.log("setTimeout function:");

function dummy() {
    console.log("Dummy after 2 sec");
}

function dummypara(message, index) {
    console.log(`Dummy after 2 sec ${message} ${index}`);
}

setTimeout(dummy, "2000");  // This means to execute dummy function after 2000ms (2sec). Note that here we're passing function name only, not parameters. If parameters are there, add it at the end of the setTimeout function call
setTimeout(dummypara, "2000", "1st para", "2nd para");  // parameters of dummypara function are passed at the end of the setTimeout function call

console.log("Text after dummy function calls");

// both normal function & arrow function can be used along with setTimeout
setTimeout(function () {
  console.log("Hello after 1 sec");
}, 1000);

setTimeout(() => {
  console.log("This runs after 1 sec");
}, 1000);

setTimeout((x, y) => {
    console.log(x+y);
}, 2000, 30, 20);

/* ************************ NESTED setTimeout ********************* */
// if we execute this code in browser(inside html using LiveServer), an additional 4ms will be added by browser
// function infinity() {
//     console.log("Infinity");
//     setTimeout(infinity, 2000);  // here, after printing "Infinity", it'll wait for 2sec
// }
// setTimeout(infinity, 2000);

/* **************************** clearTimeout ************************** */
function timer() {
    console.log("timer");
}
var timerId = setTimeout(timer, 3000);
flag=false;
if (flag==false) {
    clearTimeout(timerId);  // timer function will not get executed now since flag is false. If flag is true, 'timer' will get printed once
}

/* ************************ JS SCHEDULING-setInterval ********************* */
// Used to run a function repeatedly at fixed time intervals
// setInterval(dummy, 2000);  // this will be executed infinite time. The time duration for the whole dummy function execution will be 2sec in this case, unlike Nested setTimeout
// setInterval((x, y) => {console.log(x+y);}, 2000, 3, 2);  // arrow function can be used along with setInterval

/* *************************** clearInterval ************************ */
var timerId1 = setInterval(timer, 3000);
flag=false;
if (flag==false) {
    clearInterval(timerId1);  // timer function will not get executed now since flag is false. If flag is true, 'timer' will get printed infinitely with 3sec delay
}