const express = require('express')
const path = require('path')

const server = express()

const tasksRoute = require('./routes/tasks')

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1', tasksRoute)

module.exports = server
