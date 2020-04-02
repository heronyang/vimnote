"use strict";
require('dotenv').config()

const db = require('./db')
const app = require("express")()
const crypto = require("crypto")

// Returns "ok".
app.get("/health", (req, res) => {
  res.send("ok");
})

// Creates a new doc entry and returns its doc_id.
app.get("/create", (req, res) => {
  // TODO: Make sure there's no duplication by catching errors.
  const doc_id = crypto.randomBytes(5).toString('hex');
  db.insertDoc(doc_id, /*title=*/"", /*content=*/"");
  res.send(doc_id);
});

// Starts server.
const port = process.env.SERVER_PORT
const host = process.env.SERVER_HOST
app.listen(port, host);
console.log(`Running on http://${host}:${port}`)
