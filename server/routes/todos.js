const express = require('express')
const router = express.Router()

const { saveTodo } = require('../db/connection')

router.post('/', (req, res) => {
  saveTodo(req.body.task)
    .then(newTodo => {
      res.status(201).json(newTodo)
      return null
    })
    .catch(() => {
      res.sendStatus(500)
    })
})

module.exports = router
