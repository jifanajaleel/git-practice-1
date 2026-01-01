const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/users");
const { verifyTokenHandler } = require("../middlewares/jwtHandler");

router.post("/", [verifyTokenHandler], createUser);

router.post("/login", [verifyTokenHandler], login);

module.exports = router;
