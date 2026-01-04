//! Connecting to database & fetching records from database

const { Pool } = require("pg");  // pg is the PostgreSQL client library for Node.js. { Pool } means you are importing the Pool class from the pg package. Because pg exports multiple things and you only need Pool, curly braces is used for Pool. This is JavaScript destructuring
/*
Q) Why use Pool?
*) Opening a DB connection is expensive
*) Pool keeps connections ready and reuses them → better performance
*) Pool manages a pool of database connections (reusable connections)
*/

const pool = new Pool({  // Here you are creating a new connection pool. pool is an object that represents your DB connection manager
    user: "trainingdb_user",  // your PostgreSQL username
    password: "Ayzel@10",  // your PostgreSQL pwd
    database: "trainingdb",
    host: "localhost",  // "localhost" means: PostgreSQL is running on the same machine as Node.js
    port: 5432  // PostgreSQL default port is 5432. If PostgreSQL runs on a different port, this must change
})

module.exports = pool;

/*

How database connection works for an API call in Node.js?
1. API request comes in:
A client (browser / Postman) sends a request, for example:
    GET /api/v1/courses
2. Express receives the request:
Your Express server receives the request and matches it to a route
    router.get("/", getCourses)
3. Controller function runs:
The controller function (getCourses) is executed. Inside this function, you talk to the database
4. Database connection (Pool):
You create a database connection pool once (The process is explained in the above code)
This pool:
*) Manages connections to PostgreSQL
*) Reuses connections (fast & efficient)
*) Prevents opening a new connection for every request
5. Query the database:
Inside your controller,
    const result = await pool.query("SELECT * FROM courses");
What happens:
*) Node.js sends SQL to PostgreSQL
*) Database executes it
*) Data is returned to Node.js
6. Send response back to client:
The controller sends data as JSON:
    res.status(200).json({
        success: true,
        data: result.rows
    });
    
*Full flow (one line) - Client → Express route → Controller → Database → Controller → Client*

*/