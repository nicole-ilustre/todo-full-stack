const connection = require('./connection')

module.exports = {
  getAllTodos
}

function getAllTodos (db = connection) {
  return db('todos').select()
}
