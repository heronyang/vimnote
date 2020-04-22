require('dotenv').config()

const db = require('./db')
const crypto = require('crypto')

const checkHealth = (req, res) => {
  res.send('ok')
}

const createDoc = (req, res) => {
  // TODO: Make sure there's no duplication by catching errors.
  console.log('Create Doc')
  const docId = crypto.randomBytes(5).toString('hex')
  db.writeDoc(docId, /* title= */'', /* content= */'',
    function () { res.send(docId) })
}

const uploadDoc = (req, res) => {
  console.log('Upload Doc')
  const docId = req.body.docId
  if (!docId) {
    res.send('Missing docId.')
    return
  }
  const title = req.body.title
  const content = req.body.content
  db.writeDoc(docId, title, content, function () { res.send('ok') })
}

const downloadDoc = (req, res) => {
  console.log('Download Doc')
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
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.get('/health', checkHealth)
app.post('/create', createDoc)
app.post('/upload', uploadDoc)
app.get('/download', downloadDoc)

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
