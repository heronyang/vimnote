"use strict";
require('dotenv').config()

const app = require("express")()

// Returns "ok".
app.get("/health", (req, res) => {
  res.send("ok");
})

// Starts server.
const port = process.env.SERVER_PORT
const host = process.env.SERVER_HOST
app.listen(port, host);
console.log(`Running on http://${host}:${port}`)
