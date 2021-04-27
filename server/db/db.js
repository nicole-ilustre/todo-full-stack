const database = require('./connection')

const getTodos = (db = database) => {
  return db('todos').select()
}

const getTodo = (id, db = database) => {
  return db('todos').where('id', id).select().first()
}

const addTodo = (task, db = database) => {
  return db('todos').insert({ task })
    .then((id) => getTodo(id[0]))
}

const deleteTodo = (id, db = database) => {
  return db('todos').where('id', id).delete()
}

const updateTodo = (id, update, db = database) => {
  return db('todos').where('id', id).update(update)
    .then((id) => getTodo(id))
}

module.exports = {
  getTodos,
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo
}
