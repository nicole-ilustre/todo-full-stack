const express = require('express')
const router = express.Router()

const { saveTodo, getTodos, deleteTodo, updateTodo } = require('../db')

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

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  if (id < 1 || isNaN(id)) return res.sendStatus(400)
  deleteTodo(id)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  updateTodo(id, req.body)
    .then((todo) => res.json(todo))
    .catch(() => res.sendStatus(500))
})

module.exports = router
