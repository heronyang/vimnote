// Connects to database.
const pool = (new require('pg')).Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DB,
  password: process.env.DB_PASS
})

// Creates a database.
const test = () => {
    pool.query('SELECT * FROM doc', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results);
    })
}

module.exports = {
    test,
}
