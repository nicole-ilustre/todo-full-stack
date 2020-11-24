const express = require('express')
const router = express.Router()

const { saveTodo, getTodos } = require('../db')

router.post('/', (req, res) => {
  saveTodo(req.body.task)
    .then(newTodo => res.status(201).json(newTodo))
    .catch(() => res.sendStatus(500))
})

router.get('/', (req, res) => {
  getTodos()
    .then(todos => res.json(todos))
    .catch(() => res.sendStatus(500))
})

module.exports = router
