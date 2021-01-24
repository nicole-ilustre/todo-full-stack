const express = require('express')

const db = require('../db/todos')

const router = express.Router()

router.get('/', (req, res) => {
  db.getAllTodos()
    .then((todos) => {
      res.json({ todos })
      return null
    })
    .catch(() => {
      res.status(500).json({
        errors: [{ title: 'Unable to retrieve todos' }]
      })
      return null
    })
})

module.exports = router
