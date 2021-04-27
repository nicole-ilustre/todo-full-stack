const express = require('express')
const router = express.Router()

const { addTodo, getTodos, getTodo, deleteTodo, updateTodo } = require('../db/db')

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


//deletetodo


module.exports = router
