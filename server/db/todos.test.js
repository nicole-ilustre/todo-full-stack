const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./todos')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('todo database functions', () => {
  it('getAllTodos returns all todos', () => {
    return db.getAllTodos(testDb)
      .then((todos) => {
        expect(todos).toHaveLength(3)
        return null
      })
  })
})
