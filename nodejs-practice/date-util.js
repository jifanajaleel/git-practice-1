//! Export in js
// to use import/export, make sure to update package.json with "type": "module"
// date-util.js's functios are imported in practice4.js

import moment from "moment";

export function getDateDDDMMYY() {
    var d = moment().format('DD/MMM/YY');
    return d;
}

export function convertDateToDDMMMYYYY(date) {
    var d = moment(date).format('DD/MMM/YYYY');
    return d;
}

//! Default export function
export default function today() {
    return moment().format("DD/MM/YYYY");
}