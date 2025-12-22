var moment = require('moment');  // If "type": "module" is not added in package.json, we should use 'require'
//! Date
var d1 = moment().format();
console.log('default date:', d1);
var d2 = moment().format('DD/MM/YYYY');
console.log('formatted date as DD/MM/YYYY:', d2);
var d3 = moment().format('DD/MM/YY');
console.log('formatted date as DD/MM/YY:', d3);
var d4 = moment().format('DD/MMM/YY');
console.log('formatted date as DD/MMM/YY:', d4);