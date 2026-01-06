const {User, Role} = require("../models/userRole");  // User & Role are already associated using user_roles
// const Role = require("../models/role");
const { hashPassword } = require("../utils/passwordHelper");

const createUser = async (name, username, password) => {  // this function returns a number (integer). i.e, returns only the newly created user’s ID
  const hashedPassword = hashPassword(password);
  const user = await User.create({
    name,
    username,
    password: hashedPassword
  });

  // assign default role
  // const userRole = await Role.findOne({ where: { name: 'user' } });
  // await user.addRole(userRole);

  return user.id;
};
/*
*)Hashes the password
*)Inserts a new row into the users table
*)Sequelize returns the created User instance
*/

const getUserByUserName = async(username) => {  // this function returns an array of User instances
  const user = await User.findAll({
    where: { username }
  });
  return user;
};
/*
*)Queries the users table
*)Finds all users with the given username
*)Even though username is usually unique, findAll() always returns an array.
*/

const getUserByUserId = async (userid) => {  // this function returns a single User instance OR null. It'll not return array. It'll return either an object or null 
  return await User.findByPk(userid);
};


// This function fetches a user by ID and eager-loads their roles using Sequelize associations, returning only role names while hiding the join table.
const getUserRolesByUserId = async (userId) => {  // this function returns an array of role objects
  const user = await User.findByPk(userId, {
    include: {  //  Tells Sequelize: “Along with the user, also fetch related roles"
      model: Role,
      attributes: ['name'],  //  Fetch only 'name' from roles table. Avoids unnecessary data like id, timestamps, etc.
      through: { attributes: [] } // hide join table
      /*
      'through' refers to the join table (user_roles).
      By default Sequelize includes join table columns.
      This hides them from the response.

      ❌ Without this:
      -----------------
      {
        name: 'admin',
        user_roles: { userId: 1, roleId: 2 }
      }

      ✅ With this:
      --------------
      { name: 'admin' }  
      */
    }
  });
  // return user ? user.roles : [];
  if (!user) return [];

  // Convert Sequelize instances to plain objects
  return user.roles.map(role => role.get({ plain: true }));
  /*
  If user exists:
  *) user.Roles is automatically added by Sequelize.
  *) Contains an array of Role objects. 
  eg: 
  [{ name: 'admin' },
  { name: 'user' }]
  
  If user doesn't exist:
  *) Return empty array to avoid errors
  */
};
/*
*)Fetches user by ID
*)Eager-loads related roles via user_roles join table
*)Fetches only role names
*)Hides join table columns
*/

module.exports = {
  createUser,
  getUserByUserName,
  getUserByUserId,
  getUserRolesByUserId
};
