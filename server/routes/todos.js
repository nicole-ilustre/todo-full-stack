const express = require('express')
const router = express.Router()

const { addTodo, getTodos, getTodo, deleteTodo, updateTodo } = require('../db/db')

router.get('/', (req, res) => {
  getTodos()
    .then((todos) => {
      res.json(todos).sendStatus(200)
      return null
    })
    .catch((e) => {
      res.sendStatus(500)
      console.log(e.message)
    })
})

//addtodo

//updatetodo

//deletetodo


module.exports = router
