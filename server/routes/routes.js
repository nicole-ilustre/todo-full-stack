const express = require('express')

const db = require('../db/db')

const router = express.Router()

router.get('/', (req, res) => {
  db.getTodos()
    .then(todos => {
      return res.json(todos)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/completed', (req, res) => {
  db.getCompletetedTasks()
    .then(tasks => {
      return res.json(tasks)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/', (req, res) => {
  db.addTodo(req.body.todo)
    .then(id => {
      return db.getTodo(id)
        .then(post => {
          return res.json(post)
        })
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.patch('/:id', (req, res) => {
  db.deleteTodo(req.params.id)
    .then(() => {
      return res.status(200).send()
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.patch('/completed/:id', (req, res) => {
  db.updateTodo(req.params.id)
    .then(() => {
      return res.status(200).send()
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
