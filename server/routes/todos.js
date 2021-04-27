const express = require('express')
const router = express.Router()

const { addTodo, getTodos, deleteTodo, updateTodo } = require('../db/db')

router.get('/', (req, res) => {
  getTodos()
    .then((todos) => {
      res.sendStatus(200).json(todos)
      return null
    })
    .catch((e) => {
      res.sendStatus(500)
      console.log(e.message)
    })
})

router.post('/', (req, res) => {
  addTodo(req.body.task)
    .then((todo) => {
      res.sendStatus(201).json(todo)
      return null
    })
    .catch(e => {
      res.sendStatus(500)
      console.log(e.message)
    })
})

router.update('/:id', (req, res) => {
  updateTodo(Number(req.params.id), req.body.update)
    .then((todo) => {
      res.sendStatus(200).json(todo)
      return null
    })
    .catch(e => {
      res.sendStatus(500)
      console.log(e.message)
    })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  if (id < 1 || isNaN(id)) return res.sendStatus(400)
  deleteTodo(id)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
})

module.exports = router
