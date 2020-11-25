const knex = require('knex')
const config = require('./knexfile')
const connection = knex(config.test)

const { findTodo, saveTodo, getTodos, deleteTodo, updateTodo } = require('./')

beforeAll(() => connection.migrate.latest())
beforeEach(() => connection.seed.run())

describe('saveTodo', () => {
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

describe('getTodos', () => {
  test('gets todos from database', () => {
    return getTodos(connection).then(todos => {
      expect(todos).toHaveLength(3)
      expect(todos[0].task).toEqual('make some hay')
      return null
    })
  })
})

describe('deleteTodo', () => {
  test('deletes todo from db', () => {
    expect.assertions(1)
    return deleteTodo(2, connection)
      .then(() => getTodos(connection))
      .then(todos => {
        expect(todos.map(todo => todo.id)).toEqual([1, 3])
        return null
      })
  })
})

describe('updateTodo', () => {
  test('returns updated todo', async () => {
    expect.assertions(1)
    const oldTodo = await findTodo(2, connection)
    return updateTodo(oldTodo.id, { task: 'finish app' }, connection)
      .then((newTodo) => {
        expect(newTodo).toEqual({ ...oldTodo, task: 'finish app' })
        return null
      })
  })

  test('updates todo in db', async () => {
    expect.assertions(1)
    await updateTodo(2, { task: 'random task' }, connection)
    return findTodo(2, connection)
      .then(todo => {
        expect(todo.task).toEqual('random task')
        return null
      })
  })
})
