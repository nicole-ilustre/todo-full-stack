const knex = require('knex')
const config = require('./knexfile')
const connection = knex(config.test)

const { saveTodo } = require('./')

describe('saveTodo', () => {
  beforeAll(() => connection.migrate.latest())
  beforeEach(() => connection.seed.run())

  test('saves todo into database', () => {
    expect.assertions(2)
    const task = 'new task'
    return saveTodo(task, connection)
      .then(() => {
        return connection('todos').select()
      }).then(todos => {
        expect(todos).toHaveLength(4)
        expect(todos[3].task).toEqual('new task')
        return null
      })
  })

  test('returns the newly created todo', () => {
    expect.assertions(1)
    const task = 'new task'
    return saveTodo(task, connection)
      .then(newTodo => {
        expect(newTodo).toEqual({
          id: 4,
          task,
          priority: null,
          completed: 0
        })
        return null
      })
  })
})
