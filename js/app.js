'use strict'

const express = require('express')
const Router = require('./router')

let router = new Router()
let app = express()
require('express-ws')(app)

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    router.go(req, ws, msg)
  })
})

app.listen(3000, function() {
  console.log('Started, port: 3000')
})
