const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/users");
const { verifyTokenHandler } = require("../middlewares/jwtHandler");

router.post("/", createUser);
/*
1. run practice12_db.js
2. POST http://localhost:5000/api/v1/users in POSTMAN with below data in Body
{  
  "name": "varun",
  "username": "var",
  "password": "pwd"
}
3. Response in Body will be:
{
    "success": true,
    "data": {
        "message": "User created successfully",
        "name": "varun",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY0Mjc2OH0.sbmppYukj93F30yF8PSIxYZ1uQjGUEXfhvSJC6J_Ocs"
    }
}
*/

router.post("/login", login);
/*
1. run practice12_db.js
2. POST http://localhost:5000/api/v1/users/login in POSTMAN with below data in Body
{
  "username": "var",
  "password": "pwd"
}
3. Response in Body will be:
{
    "message": "Logged in successfully",
    "user": {
        "name": "varun"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NzY0NDUzN30.TUV2lBLtnh9H1ObQSM3Xp9plaon9yEZDWUFK1lHzOGY"
}
*/

module.exports = router;
