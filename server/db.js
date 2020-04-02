// Connects to database.
const pool = (new require('pg')).Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DB,
  password: process.env.DB_PASS
})

// Inserts a new doc record.
const insertDoc = (id, title, content) => {
    pool.query('INSERT INTO doc (id, title, content) VALUES ($1, $2, $3)',
        [id, title, content], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results);
    })
}

module.exports = {
    insertDoc,
}
