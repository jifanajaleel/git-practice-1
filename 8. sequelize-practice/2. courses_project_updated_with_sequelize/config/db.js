const { Pool } = require("pg");

const pool = new Pool({
    password: "Ayzel@10",
    database: "trainingdb",
    host: "localhost",
    port: 5432
})

module.exports = pool;
