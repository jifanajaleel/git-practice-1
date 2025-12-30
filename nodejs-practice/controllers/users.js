//! To implement sign-up api, save hashed pwd & token generation

const usersRepository = require("../repositories/users");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const { createJwt } = require("../utils/jwtHelper");
const {compareWithHashedPassword} = require("../utils/passwordHelper");

// @desc     Create new users
// @route    POST /api/v1/users
// @access   public
const createUser = asyncHandler(async (req, res, next) => {
  const { name, username, password } = req.body;  // id, name, username, password are table columns
  const users = await usersRepository.getUserByUserName(username);  // users will be an array of objects
  if (users && users.length > 0) {
    /*
    Condition	Meaning
    |--------------------------------|-----------------------------------------------------------|
    |if (users)	                     | Checks if variable exists (array OR empty array both pass)|
    |if (users.length > 0)	         | Checks if array has data----------------------------------|
    |if (users && users.length > 0)  | ✅ Safest & most correct--------------------------------- |
    |--------------------------------|-----------------------------------------------------------|
    */
    return next(new ErrorResponse(`Username(${username}) already taken`, 400));
  }
  const userId = await usersRepository.createUser(name, username, password);  // this code will run only if above 'if' block is false
  const token = createJwt(userId);
  console.log("userId:", userId);
  if (userId) {
    res.status(201).json({
    success: true,
    data: { message: "User created successfully", name: name, token: token },
    /* 
      In postman, give POST http://localhost:5000/api/v1/users and give a json data in body eg: {"name": "ameera","username": "ami","password": "hola"}.
      Response will be as:
      {
        "success": true,
        "data": {
            "message": "User created successfully",
            "name": "ameera",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2IiwiaWF0IjoxNzY2NjkzMDc0fQ.HpeFE-TN64bBZ9IlX2eL0VYTxAA_v4wbudEfOWSW_Ec"
        }
      }
      If you go to jwt.io and give this token there, you could see 'userId' in the payload. It means userId is linked with JWT.
      In next api calls, you can pass "Authorization" key and this "jwt token" as value in Headers section for authorization of the user.
      */
  });
  }
});

//! login api
// @desc     User login
// @route    POST /api/v1/users/login
// @access   public
const login = asyncHandler(async (req, res, next) => {
  // get user by username
  // if user is not valid, return 400
  // if user is there, compare password. if invalid - return 400. if valid - token
  const { username, password } = req.body;
  // now we want to check if username & pwd are valid or not to proceed login operation
  const users = await usersRepository.getUserByUserName(username);
  if (!users || users.length == 0) {  // if this condition is true, then the execution will be stopped at below return statement
    return next(new ErrorResponse(`Invalid credentials`, 400));
  }
  const user = users[0];  // if user exists or user is valid, then only this line of code is executed. user will have id, name, username, password
  const isValid = compareWithHashedPassword(password, user.password);
  if (isValid) {  // checks if pwd is valid
    const token = createJwt(user.id);
    return res.status(200).json({message: "Logged in successfully", user: {
      name: user.name,
    }, token: token});
  }
  return next(new ErrorResponse(`Invalid credentials`, 400));  // if pwd is invalid, then only this line of code is executed
});

module.exports = {
  createUser,
  login
};
