const express = require('express')
const path = require('path')

const server = express()
const routes = require('./routes/routes')

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/v1/todos', routes)

module.exports = server
