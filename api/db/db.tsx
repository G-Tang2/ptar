const Pool = require('pg').Pool;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});

pool.connect((err, db, done) => {
    if(err) {
        return console.log(err);
    }
    console.log("Database connected...")
})
  
module.exports = pool;