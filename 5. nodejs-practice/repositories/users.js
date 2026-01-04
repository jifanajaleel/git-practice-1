//! To implement sign-up api, save hashed pwd & token generation

const pool = require("../config/courses_db");
const usersQueries = require("../queries/users");
const { hashPassword } = require("../utils/passwordHelper");

// createUser() hashes the password, inserts a user into the database, and returns the newly created user’s ID using a Promise
const createUser = (name, username, password) => {  // this function returns a promise, i.e,  Promise<number>. Eventually resolves to → userId (number)
  const hashedPassword = hashPassword(password);  // hashedPassword is a string
  return new Promise((resolve, reject) => {  // since PostgreSQL’s pool.query() is asynchronous, this is returning promise
    pool.query(usersQueries.addUser, [name, username, hashedPassword], (error, results) => {  // give array in correct order as given in $ in query
      if (error) {  // asyncHandler → errorHandler middleware
        reject(error);  // error is an Error object
      } else {
        console.log(results.rows);  // because of RETURNING id usage in query, here results.rows = [{ id: 6 }] in the output. that is results.rows is an array of objects
        const userId = results.rows ? results.rows[0].id : undefined;  // results.rows[0].id will be 6 in output
        resolve(userId);  // userId will be 6 in output. This is final output for success
        // resolve(true);
      }
    });
  });
};

const getUserByUserName = (username) => {  // this function returns Promise<Array<Object>>
  return new Promise((resolve, reject) => {
    pool.query(usersQueries.getUserByUserName, [username], (error, results) => {
      if (error) {
        reject(error);  // error is an Error object. eg: 'Error: invalid input syntax for type bigint'
      } else {
        resolve(results.rows);  // results.rows is an array of objects. PostgreSQL always returns rows as an array, even if only ONE row exists
        /* eg:
        results.rows = [{ id: 1, name: "hana", username: "hil", password: "" }];
        */
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