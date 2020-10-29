const connection = require('./connection')

function getTodos (db = connection) {
  return db('todos').select()
}

// function getTodos(db = connection) {
//   return db('todos').select()
//     .then(todos => todos.map(todo => {
//       todo.completed = !!todo.completed
//       return todo
//     }))
// }

function addTodo (todo, db = connection) {
  return db('todos').insert(todo)
}

function updateTodo (id, todo, db = connection) {
  return db('todos').update(todo).where('id', id)
}

function deleteTodo (id, todo, db = connection) {
  return db('todos').delete().where('id', id)
}

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
}
