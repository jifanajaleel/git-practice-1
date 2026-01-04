var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

function hashPassword(password) {
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

function compareWithHashedPassword(plainPassword, hashedPassword) {
    var isMatching = bcrypt.compareSync(plainPassword, hashedPassword);
    return isMatching;
}

module.exports = {
    hashPassword,
    compareWithHashedPassword
};

/*
1. Run the practice12db.js using command 'node practice12db.js'
2. Give 'POST' method in postman with route as http://localhost:5000/api/v1/users
3. Give below json object in Body:
{
    "name": "jumana",
    "username": "jumi",
    "password": "kiebot"
}
4. Hit 'Send' in postman
5. You'll get response in postman as:
{
    "success": true,
    "data": {
        "message": "User created successfully"
    }
}
6. Check the users table in Postgresql db, you will see a new entry with hashed password. Even though I gave kiebot as pwd, it was $2b$10$PTDDQbfjfhWS6U9XXal3OerzLiFxL.5aJIxm8BuVYwdXmzGIiF0Xq in the table
*/