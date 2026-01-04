//! Database Configuration & Connection
/*
What this file does:
✔ Connects Node.js to PostgreSQL
✔ Confirms DB access
✔ Shares the Sequelize instance across the app
*/

const Sequelize = require("sequelize");

// stores PostgreSQL connection details. This is similar to a .env config (but hardcoded here):
const dbConfig = {
    user: "trainingdb_user",
    password: "Ayzel@10",
    database: "practice_sequelize_db",  // create a db in pgadmin named practice_sequelize_db
    host: "localhost",
    port: 5432
}

// sequelize object creation. This object: Manages DB connection, Executes SQL queries, Defines models
const sequelize = new Sequelize(
    dbConfig.database, 
    dbConfig.user, 
    dbConfig.password,
    {
        host: "localhost",
        dialect: "postgres"  // dialect: "postgres" tells Sequelize which DB engine to use
    }
);

// verifying the database connection:
// below step does not create tables. Only checks: Username, Password, Host, DB availability
sequelize.authenticate()
    .then(() => {
    console.log("Connected successfully");
    })
    .catch((error) => {
    console.log("Connection failed:", error);
    })
/*
step 1) run dbconfig.js and check console printing "Connected successfully"
*/

module.exports = sequelize;
