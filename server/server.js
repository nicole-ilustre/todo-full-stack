const express = require('express')
const path = require('path')
const todoListRoutes = require('./routes/todos')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
server.use('/api/v1/todos', todoListRoutes)

module.exports = server
