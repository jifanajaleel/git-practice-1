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
  const { name, username, password } = req.body;
  const users = await usersRepository.getUserByUserName(username);
  if (users.length > 0) {
    return next(new ErrorResponse(`Username(${username}) already taken`, 400));
  }
  const userId = await usersRepository.createUser(name, username, password);
  const token = createJwt(userId);
  console.log("userId:", userId);
  res.status(201).json({
    success: true,
    data: { message: "User created successfully", name: name, token: token }
  });
});

//! login api
// @desc     User login
// @route    POST /api/v1/users/login
// @access   public
const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const users = await usersRepository.getUserByUserName(username);
  if (users.length === 0) {
    return next(new ErrorResponse(`Invalid credentials`, 400));
  }
  const user = users[0];
  const isValid = compareWithHashedPassword(password, user.password);
  if (!isValid) {
    return next(new ErrorResponse("Invalid credentials", 400));
  }
  const token = createJwt(user.id);
  res.status(200).json({
    message: "Logged in successfully",
    user: {name: user.name},
    token: token});
});

module.exports = {
  createUser,
  login
};
