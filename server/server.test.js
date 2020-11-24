import request from 'supertest'
import server from './server'
import { saveTodo } from './db'

const fakeTodo = {
  id: 1,
  task: 'do things',
  priority: null,
  completed: false
}
jest.mock('./db', () => ({
  saveTodo: jest.fn(() => Promise.resolve(fakeTodo))
}))

describe('POST /api/v1/todos', () => {
  let promise
  beforeAll(() => {
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
