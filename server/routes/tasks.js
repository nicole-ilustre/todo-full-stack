const express = require('express')

const router = express.Router()

const db = require('../db/db')


router.get('/', (req,res) => {
  db.getAllTasks()
  .then(tasks => {
    res.json(tasks)
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
})

module.exports = router