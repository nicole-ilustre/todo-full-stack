const connection = require('./connection')

module.exports = {
  addTask,
  getAllTasks
}

function getAllTasks (db = connection) {
  return db('tasks').select()
}

function addTask (name, urgency, db = connection) {
  return db('tasks').insert(
    { name, 
    urgency,
    completed: false
  })
}