const request = require('supertest')

const server = require('../server')
const db = require('../db/todos')

jest.mock('../db/todos')

afterEach(() => {
  jest.clearAllMocks()
})

describe('GET /api/v1/todos', () => {
  it('returns the correct data on success', () => {
    db.getAllTodos.mockImplementation(() => {
      return Promise.resolve([
        { id: 1, title: 'test todo 1', completed: true },
        { id: 2, title: 'test todo 2', completed: false }
      ])
    })
    return request(server)
      .get('/api/v1/todos')
      .expect(200)
      .then((res) => {
        expect(res.body.todos).toHaveLength(2)
        return null
      })
  })

  it('returns an error when it fails', () => {
    db.getAllTodos.mockImplementation(() => {
      return Promise.reject(new Error('test error'))
    })
    return request(server)
      .get('/api/v1/todos')
      .expect(500)
      .then((res) => {
        const { errors } = res.body
        expect(errors).toHaveLength(1)
        expect(errors[0].title).not.toMatch('test error')
        expect(errors[0].title).toMatch('Unable to retrieve todos')
        return null
      })
  })
})
