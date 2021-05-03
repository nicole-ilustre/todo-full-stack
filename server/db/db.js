const config = require('./knexfile').development
const database = require('knex')(config)

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodo,
  getCompletetedTasks
}

function getTodos (db = database) {
  return db('todos').select('todo')
}

function getTodo (id, db = database) {
  return db('todos')
    .select('todo')
    .where('id', id)
    .first()
}

function getCompletetedTasks (db = database) {
  return db('todos').select('todo')
    .where('completed', 1)
}
function addTodo (todo, db = database) {
  return db('todos')
    .insert(
      {
        todo: todo,
        completed: 0
      })
}

function deleteTodo (id, db = database) {
  return db('todos')
    .del()
    .where('id', id)
}

function updateTodo (id, db = database) {
  return db('todos')
    .update({
      completed: 1
    })
    .where('id', id)
}
