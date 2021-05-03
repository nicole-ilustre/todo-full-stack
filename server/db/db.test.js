const knex = require('knex')
const config = require('./knexfile')
const env = 'test'
const testDb = knex(config[env])

const {
  getTodos,
  addTodo,
  deleteTodo
} = require('./db')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('getTodos returns all todos', () => {
  expect.assertions(1)
  return getTodos(testDb)
    .then(results => {
      expect(results).toHaveLength(3)
      return null
    })
})

test('addTodo adds an item to the database', () => {
  const testTodo = 'laundry'
  expect.assertions(1)
  return addTodo(testTodo, testDb)
    .then(result => {
      expect(result).toEqual([4])
      return null
    })
})

test('deleteTodo deletes one item', () => {
  const testId = 1
  expect.assertions(1)
  return deleteTodo(testId, testDb)
    .then(result => {
      expect(result).toEqual(1)
      return null
    })
})
