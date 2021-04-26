const connection = require('./connection')

module.exports = {
  addTask,
  getAllTasks
}

function addTask (name, urgency, db = connection) {
  return db('tasks').insert({name, urgency})
}

function getAllTasks (db = connection) {
  return db('tasks').select()
}