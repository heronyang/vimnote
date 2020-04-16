// Connects to database.
const pg = require('pg')
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DB,
  password: process.env.DB_PASS
})

// Inserts a new doc record.
const writeDoc = (id, title, content, callback) => {
  pool.query('INSERT INTO doc (id, title, content) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET (id, title, content) = ($1, $2, $3)',
    [id, title, content], (error, results) => {
      if (error) {
        throw error
      }
      callback()
    })
}

const readDoc = (id, callback) => {
  pool.query('SELECT title, content FROM doc WHERE id=$1',
    [id], (error, results) => {
      if (error) {
        throw error
      }
      callback(results.rows[0])
    })
}

module.exports = {
  writeDoc,
  readDoc
}
