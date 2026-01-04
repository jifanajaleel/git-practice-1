const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/users");
const { verifyTokenHandler } = require("../middlewares/jwtHandler");

// router.post("/", createUser);
router.post("/", [verifyTokenHandler], createUser);  // when a request comes to "/" url, the request passes through verifyTokenHandler middleware before going to getCourses. Here inside array, we can include many middlewares. if next() is added in verifyTokenHandler, the next middleware will get executed before getCourses
/*
1) In postman, give POST method for route http://localhost:5000/api/v1/users, give a JSON object in Body, and give below JWT token as value to the key "Authorization" in Headers.
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2IiwiaWF0IjoxNzY2NjkzMDc0fQ.HpeFE-TN64bBZ9IlX2eL0VYTxAA_v4wbudEfOWSW_Ec
2) you will get response in postman as:
{
    "success": true,
    "data": {
        "message": "User created successfully",
        "name": "zohan",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5IiwiaWF0IjoxNzY2NzY0NTY5fQ.ShT6xN2b4rT4S8zPSeeOWLch1ykowkrr1HnLe_oOyBo"
    }
}
*/

router.post("/login", [verifyTokenHandler], login);
/*
1) In postman, give POST method for route http://localhost:5000/api/v1/users/login. Give json object in body as given below:
{
    "username": "jumi",
    "password": "kiebot"
}
Give JWT token in the Headers (key is Authorization. value should be token given above with Bearer)
2) You will get response in postman as:
{
    "message": "Logged in successfully",
    "user": {
        "name": "jumana"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwiaWF0IjoxNzY2Nzc0MTA3fQ.xllluihEEJVPf9SuZjAgc36LnzLZbjVpCqO7_b4GYtM"
}
3) You can try with wrong password. Response will be:
{
    "message": "Invalid credentials"
}
4) You can try with wrong username. Response will be:
{
    "message": "Invalid credentials"
}
*/
module.exports = router;