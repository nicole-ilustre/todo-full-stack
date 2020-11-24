const database = require('./connection')

function findTodo (id, db = database) {
  return db('todos').where({ id }).select().first()
}

function saveTodo (task, db = database) {
  return db('todos').insert({ task })
    .then((ids) => {
      return findTodo(ids[0], db)
    })
}

function getTodos (db = database) {
  return db('todos').select()
}

function deleteTodo (id, db = database) {
  return db('todos').where({ id }).delete()
}

module.exports = {
  saveTodo,
  getTodos,
  deleteTodo
}
