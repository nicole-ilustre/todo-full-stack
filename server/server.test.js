import request from 'supertest'
import server from './server'
import { saveTodo, getTodos } from './db'

jest.mock('./db', () => ({
  saveTodo: jest.fn(),
  getTodos: jest.fn()
}))

let promise
describe('POST /api/v1/todos', () => {
  const fakeTodo = {
    id: 1,
    task: 'do things',
    priority: null,
    completed: false
  }

  beforeAll(() => {
    saveTodo.mockImplementation(() => Promise.resolve(fakeTodo))
    promise = request(server)
      .post('/api/v1/todos')
      .send({ task: 'new task' })
  })
  test('returns a 201', () => {
    expect.assertions(1)
    return promise.then(res => {
      expect(res.status).toBe(201)
      return null
    })
  })

  test('calls savePost from database', () => {
    expect.assertions(1)
    return promise.then(res => {
      expect(saveTodo).toHaveBeenCalledWith('new task')
      return null
    })
  })

  test('returns the newly created todo', () => {
    expect.assertions(1)
    return promise.then(res => {
      expect(res.body).toEqual(fakeTodo)
      return null
    })
  })

  describe('when db call is unsuccessful', () => {
    test('returns 500 status', () => {
      const err = new Error('something bad')
      saveTodo.mockImplementation(() => Promise.reject(err))
      expect.assertions(1)
      return request(server)
        .post('/api/v1/todos')
        .send({ task: 'new task' })
        .then(res => {
          expect(res.status).toBe(500)
          return null
        })
    })
  })
})

describe('GET /api/v1/todos', () => {
  describe('when database call works', () => {
    const fakeTodos = [{ task: 'thing' }, { task: 'another thing' }]
    beforeAll(() => {
      getTodos.mockImplementation(() => Promise.resolve(fakeTodos))
      promise = request(server)
        .get('/api/v1/todos')
    })

    test('call db.getTodos', () => {
      return promise.then(() => {
        expect(getTodos).toHaveBeenCalled()
        return null
      })
    })
    test('return todos from database', () => {
      return promise.expect(200).then(response => {
        expect(response.body).toEqual(fakeTodos)
        return null
      })
    })
  })

  describe('when database does not work', () => {
    test('returns 500', () => {
      expect.assertions(1)
      const err = new Error('horrible things')
      getTodos.mockImplementation(() => Promise.reject(err))
      return request(server).get('/api/v1/todos')
        .then(res => {
          expect(res.status).toBe(500)
          return null
        })
    })
  })
})
