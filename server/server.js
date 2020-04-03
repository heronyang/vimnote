require('dotenv').config()

const db = require('./db')
const crypto = require('crypto')

const checkHealth = (req, res) => {
  res.send('ok')
}

const createDoc = (req, res) => {
  // TODO: Make sure there's no duplication by catching errors.
  const docId = crypto.randomBytes(5).toString('hex')
  db.insertDoc(docId, /* title= */'', /* content= */'')
  res.send(docId)
}

const app = require('express')()
app.get('/health', checkHealth)
app.get('/create', createDoc)

// Starts server.
const port = process.env.SERVER_PORT
const host = process.env.SERVER_HOST
const server = app.listen(port, host, () => {
  const host = server.address().address
  const port = server.address().port
  console.log('Running on http://%s:%s', host, port)
})

// Exits safely on SIGINT.
process.on('SIGINT', function () {
  server.close()
  console.log('Bye.')
  process.exit()
})
