const request = require('supertest')
const cheerio = require('cheerio')
const db = require('../db/db')
const server = require('../server')

jest.mock('../db/db', () => {
  return {
    getTodos: jest.fn()
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
    .get('/')
    .then((res) => {
      console.log(res.text)
      const $ = cheerio.load(res.text)
      const items = $('li')
      expect(items).toHaveLength(2)
      return null
    })
})