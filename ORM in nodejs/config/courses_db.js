const { Pool } = require("pg");

const pool = new Pool({
    user: "trainingdb_user",
    password: "Ayzel@10",
    database: "trainingdb",
    host: "localhost",
    port: 5432
})

module.exports = pool;
