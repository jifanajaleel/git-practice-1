const addUser = "INSERT INTO users(name, username, password) VALUES($1, $2, $3) RETURNING id";  // After inserting the row, PostgreSQL will return the value of the id column of the newly created row. Postgresql sends back results.rows = [{ id: 6 }]. In simple words, RETURNING id returns the auto-generated user ID of the newly inserted row without requiring a separate SELECT query
const getUserByUserName = "SELECT id, name, username, password FROM users WHERE username=$1";
const getUserByUserId = "SELECT id, name, username, password FROM users WHERE id=$1";
const getUserRolesByUserId = "SELECT r.name FROM role r INNER JOIN userrole ur ON ur.roleid=r.id WHERE ur.userid=$1";

module.exports = {
    addUser,
    getUserByUserName,
    getUserByUserId,
    getUserRolesByUserId
};

/*
3 Tables used:
users
|----|------|----------|----------|
| id | name | username | password |
|----|------|----------|----------|

role - it could be admin or user
|----|------|
| id | name |
|----|------|

user & role table has many-to-many relationship. Hence userrole table is created
userrole
|----|--------|--------|
| id | userid | roleid |
|----|--------|--------|
*/