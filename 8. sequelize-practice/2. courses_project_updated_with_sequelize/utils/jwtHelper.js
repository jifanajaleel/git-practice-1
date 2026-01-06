var jwt = require("jsonwebtoken");
var SECRET = "afhrnkc588691";

function createJwt(userId) {
  var token = jwt.sign({ userId: userId }, SECRET);
  return token;
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    const formattedToken = token.replace("Bearer ", "");
    jwt.verify(formattedToken, SECRET, (err, decoded) => {
      console.log("decoded:", decoded);
      if (err) return reject({ valid: false, error: err });
      resolve({ valid: true, userid: decoded.userId });  // decoded will be the payload
    });
  });
}

module.exports = {
  createJwt,
  verifyToken,
};
