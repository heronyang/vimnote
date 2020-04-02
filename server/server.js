"use strict";
require('dotenv').config()

const db = require('./db')
const crypto = require("crypto")

const checkHealth = (req, res) => {
  res.send("ok");
}

const createDoc = (req, res) => {
  // TODO: Make sure there's no duplication by catching errors.
  const doc_id = crypto.randomBytes(5).toString('hex');
  db.insertDoc(doc_id, /*title=*/"", /*content=*/"");
  res.send(doc_id);
}

const app = require("express")()
app.get("/health", checkHealth)
app.get("/create", createDoc)

// Starts server.
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
console.log(`Running on http://${host}:${port}`)
