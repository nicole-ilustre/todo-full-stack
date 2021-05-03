const connection = require('./connection')

module.exports = {
  addTask,
  getAllTasks,
  deleteTask
}

function getAllTasks (db = connection) {
  return db('tasks').select()
}

function addTask (name, urgency, db = connection) {
  return db('tasks').insert(
    {
      name,
      urgency,
      completed: false
    })
}

function deleteTask (id, db = connection) {
  return db('tasks').delete()
    .where('id', id)
}
