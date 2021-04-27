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

router.post('/', (req,res) => {
  const { name, urgency } = req.body
  db.addTask(name, urgency)
  .then(() => {
    res.status(200).send()
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
})

module.exports = router