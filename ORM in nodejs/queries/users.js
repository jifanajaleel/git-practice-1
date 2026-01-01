const addUser = "INSERT INTO users(name, username, password) VALUES($1, $2, $3) RETURNING id";  // [{ id: 6 }]
const getUserByUserName = "SELECT id, name, username, password FROM users WHERE username=$1";
const getUserByUserId = "SELECT id, name, username, password FROM users WHERE id=$1";
const getUserRolesByUserId = "SELECT r.name FROM role r INNER JOIN userrole ur ON ur.roleid=r.id WHERE ur.userid=$1";

module.exports = {
    addUser,
    getUserByUserName,
    getUserByUserId,
    getUserRolesByUserId
};
