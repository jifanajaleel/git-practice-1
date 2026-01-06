const User = require("./user");
const Role = require("./role");

User.belongsToMany(Role, {through: "userrole", foreignKey: "userid"});
Role.belongsToMany(User, {through: "userrole", foreignKey: "roleid"});
/*
This replaces:
---------------
SELECT r.name FROM role r
INNER JOIN userrole ur ON ur.roleid = r.id
WHERE ur.userid = $1
*/

module.exports = { User, Role };
