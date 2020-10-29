const express = require('express')

const todoDb = require('../db/todos')

const router = express.Router()

router.get('/', (req, res) => {
  todoDb
    .getTodos()
    .then(todos => {
      res.json(todos)
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'It went wrong.' })
    })
})

router.post('/', (req, res) => {
  const todo = {}
  const attrs = ['task', 'completed']
  attrs.forEach(attr => {
    if (attr in req.body) todo[attr] = req.body[attr]
  })

  todoDb
    .addTodo(todo)
    .then(() => {
      res.json({})
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'It went wrong.' })
    })
})

router.patch('/:id', (req, res) => {
  const id = req.params.id
  const todo = {}
  const attrs = ['task', 'completed']
  attrs.forEach(attr => {
    if (attr in req.body) todo[attr] = req.body[attr]
  })

  todoDb
    .updateTodo(id, todo)
    .then(() => {
      res.json({})
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'It went wrong.' })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  todoDb
    .deleteTodo(id)
    .then(() => {
      res.json({})
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'It went wrong.' })
    })
})

module.exports = router
