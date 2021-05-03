const request = require('supertest')
const db = require('../db/db')
const server = require('../server')

jest.mock('../db/db', () => {
  return {
    getTodos: jest.fn(),
    deleteTodo: jest.fn(),
    addTodo: jest.fn()
  }
})

test('gets all todos', () => {
  db.getTodos.mockImplementation(() => {
    return Promise.resolve([
      { id: 1, todo: 'breakfast', completed: 0 },
      { id: 2, todo: 'lunch', completed: 0 }
    ])
  })
  return request(server)
    .get('/v1/todos')
    .then((res) => {
      expect(res.body).toHaveLength(2)
      return null
    })
})

test('deletes a todo item', () => {
  db.deleteTodo.mockImplementation(() => {
    return Promise.resolve([
      { id: 1, todo: 'breakfast', completed: 0 },
      { id: 2, todo: 'lunch', completed: 0 }
    ])
  })

  return request(server)
    .patch('/v1/todos/1')
    .then((res) => {
      expect(res.status).toEqual(200)
      return null
    })
})

test('adds a todo item', () => {
  db.addTodo.mockImplementation(() => {
    return Promise.resolve([
      { id: 1, todo: 'breakfast', completed: 0 },
      { id: 2, todo: 'lunch', completed: 0 }
    ])
  })
  return request(server)
    .post('/v1/todos')
    .then((res) => {
      expect(res.body).toEqual({})
      return null
    })
})
