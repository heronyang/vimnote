require('dotenv').config()

const db = require('./db')
const crypto = require('crypto')

const checkHealth = (req, res) => {
  res.send('ok')
}

const createDoc = (req, res) => {
  // TODO: Make sure there's no duplication by catching errors.
  const docId = crypto.randomBytes(5).toString('hex')
  db.writeDoc(docId, /* title= */'', /* content= */'',
    function () { res.send(docId) })
}

const updateDoc = (req, res) => {
  const docId = req.body.docId
  if (!docId) {
    res.send('Missing docId.')
    return
  }
  const title = req.body.title
  const content = req.body.content
  db.writeDoc(docId, title, content, function () { res.send('ok') })
}

const loadDoc = (req, res) => {
  const docId = req.query.docId
  if (!docId) {
    res.send('Missing docId.')
    return
  }
  db.readDoc(docId, function (result) { res.send(result) })
}

// Defines provided APIs.
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/health', checkHealth)
app.post('/create', createDoc)
app.post('/update', updateDoc)
app.get('/load', loadDoc)

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
