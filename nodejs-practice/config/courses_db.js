const { Pool } = require("pg");

const pool = new Pool({
    user: "trainingdb_user",
    password: "Ayzel@10",
    host: "localhost",
    port: 5432,
    database: "trainingdb"
})

module.exports = pool;