//! Validating token and protecting API using middleware

const { verifyToken } = require("../utils/jwtHelper");
const { getUserRolesByUserId } = require("../repositories/users");

// verifyTokenHandler is a middleware fn
const verifyTokenHandler = async (req, res, next) => {  // this function returns userid
  // Retrieve token from http header
  // Verify if token is valid
  // If not valid, return 401 status
  // If valid, proceed next
  let token = req.headers["authorization"];
  if (token && token.includes("Bearer")) {  // Check if token exists & format is correct
    try {
        const result = await verifyToken(token);
        const userid = result.userid;
        req.userid = userid;  // attaching userid to req and then passes to next operation
        console.log(req.userid);
        return next();  // Now all next controllers can access it
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
    // verifyToken(token).then((result) => {
    //     next();
    // }).catch(error => {
    //     res.status(401).json({ message: "Invalid token" });
    // })
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

// below middleware is to check role
const verifyRoles = (roles) => {  // roles is an array. eg: ["admin", "user"]
  return async (req, res, next) => {
    // req has userid(req.userid as set in verifyTokenHandler) - get roles by userid
    // if user has roles mentioned in array -> then proceed. Else -> block user
    const userid = req.userid;
    const userRoles = await getUserRolesByUserId(userid);
    console.log("userRoles:", userRoles);  // eg: userRoles:  [ { name: 'user' }, { name: 'admin' } ]
    let hasRole = false;
    for (let userRole of userRoles) {
      console.log("userRole:", userRole);  // eg: userRole: { name: 'user' }
      if (roles.includes(userRole.name)) {
        hasRole = true;
        break;
      }
    }
    if (hasRole) {
      next();
    } else {
      return res.status(403).json({ message: "You do not have permission" });
    }
  }
}

module.exports = {
    verifyTokenHandler,
    verifyRoles
};