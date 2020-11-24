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

module.exports = {
  saveTodo
}
