const Sequelize = require("sequelize");

const dbConfig = {
    user: "trainingdb_user",
    password: "Ayzel@10",
    database: "trainingdb2",  // you'll have to manually create a trainingdb2 database in pgAdmin
    host: "localhost",
    port: 5432
}

const sequelize = new Sequelize(
    dbConfig.database, 
    dbConfig.user, 
    dbConfig.password,
    {
        host: "localhost",
        dialect: "postgres"
    }
);

sequelize.authenticate()
    .then(() => {
    console.log("Connected successfully");

    sequelize.sync()
    /* 
    sequelize.sync() tells Sequelize: “Make sure all models match the database tables.”
        If a table does not exist → Sequelize creates it
        If a table already exists → Sequelize does nothing
        It doesn't modify existing columns be default

    sequelize.sync({force:true}) tells Sequelize: “DROP existing tables and RECREATE them from the model definition.”
*/
    .then((data) => {
        // console.log("Models synced:", data);})
        console.log("Models synced:");})
    .catch((error) => {
        console.log("Models sync failed:", error);
    })})

    .catch((error) => {
    console.log("Connection failed:", error);
    })

module.exports = sequelize;
