import request from 'supertest'
import { getTodos } from '../../server/db/db'

import server from '../../server/server'

jest.mock('../../server/db/db', () => ({
  getTodos: jest.fn()
}))

test('returns all todos', () => {
  getTodos.mockImplementation(() => {
    return Promise.resolve([
      { id: 1, todo: 'breakfast', completed: 0 },
      { id: 2, todo: 'lunch', completed: 0 }
    ])
  })
  expect.assertions(1)
  return request(server)
    .get('/v1/todos')
    .then(res => {
      expect(res.body).toHaveLength(2)
      return null
    })
})

test('returns an error', () => {
  getTodos.mockImplementation(() => {
    return Promise.reject(new Error('db error'))
  })
  expect.assertions(1)
  return request(server)
    .get('/v1/todos')
    .then(res => {
      expect(res.status).toEqual(500)
      return null
    })
})
