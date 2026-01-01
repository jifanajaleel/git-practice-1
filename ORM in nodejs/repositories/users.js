const pool = require("../config/courses_db");
const usersQueries = require("../queries/users");
const { hashPassword } = require("../utils/passwordHelper");

const createUser = (name, username, password) => {
  const hashedPassword = hashPassword(password);
  return new Promise((resolve, reject) => {
    pool.query(usersQueries.addUser, [name, username, hashedPassword], (error, results) => {
      if (error) {
        reject(error);
      } else {
        console.log(results.rows);
        const userId = results.rows ? results.rows[0].id : undefined;
        resolve(userId);
      }
    });
  });
};

const getUserByUserName = (username) => {  // this function returns Promise<Array<Object>>
  return new Promise((resolve, reject) => {
    pool.query(usersQueries.getUserByUserName, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getUserByUserId = (userid) => {
  return new Promise((resolve, reject) => {
    pool.query(usersQueries.getUserByUserId, [userid], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getUserRolesByUserId = (userid) => {
  console.log("userid:", userid)
  return new Promise((resolve, reject) => {
    pool.query(usersQueries.getUserRolesByUserId, [userid], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);  // returns array of role names. eg: [{name: "admin"}]
      }
    });
  });
};

module.exports = {
  createUser,
  getUserByUserName,
  getUserByUserId,
  getUserRolesByUserId
};
