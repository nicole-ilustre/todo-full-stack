const express = require('express')
const path = require('path')

const todoRoutes = require('./routes/todos')

const server = express()

server.use(express.json())
server.use(express.static(path.join('server', 'public')))

server.use('/todos', todoRoutes)

module.exports = server
