const request = require('supertest')

const server = require('../server')

const {
  getAllTasks
} = require('../db/db')

jest.mock('../../db', () => {
  return {
    getAllTasks: jest.fn()
  }
})

const url = '/api/v1'

describe('GET /', () => {
  test('returns an object', () => {
    getAllTasks.mockImplementation(() => Promise.resolve(['hello']))
    return request(server)
      .get(url + '/')
      .then(res => {
        expect(res).toBeUndefined()
        return null
      })
  })
})
