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
    return next(new ErrorResponse(`Username(${username}) already taken`, 400));
  }
  const userId = await usersRepository.createUser(name, username, password);  // this code will run only if above 'if' block is false
  const token = createJwt(userId);
  console.log("userId:", userId);
  if (userId) {
    res.status(201).json({
    success: true,
    data: { message: "User created successfully", name: name, token: token },
  });
  }
});

//! login api
// @desc     User login
// @route    POST /api/v1/users/login
// @access   public
const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
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
