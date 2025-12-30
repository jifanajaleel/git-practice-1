//! Code Refactoring: Creating custom error response

class ErrorResponse extends Error{  // here base class Error is extended to create ErrorResponse class. Now ErrorResponse inherits everything from Error
    constructor(message, statusCode) {
        super(message);  // calls parent Error constructor
        this.statusCode = statusCode;
    }
}
/*
*) JavaScript already has a built-in Error class. But it only contains message. The code is:
    throw new Error("Something went wrong");
*) ErrorResponse is created to add custom HTTP status code along with message
*/

module.exports = ErrorResponse;