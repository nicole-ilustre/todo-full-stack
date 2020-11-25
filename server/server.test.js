import request from 'supertest'
import server from './server'
import { saveTodo, getTodos, deleteTodo, updateTodo } from './db'

jest.mock('./db', () => ({
  saveTodo: jest.fn(),
  getTodos: jest.fn(),
  deleteTodo: jest.fn(),
  updateTodo: jest.fn()
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

describe('DELETE /api/v1/todos/:id', () => {
  test('returns 400 error if id not good', () => {
    expect.assertions(3)
    const badIds = ['0', '-23', 'bananas']
    const promises = badIds.map(id => expectDeleteStatusForId(id, 400))
    return Promise.all(promises)
  })
  test('return 200 if delete happens', () => {
    deleteTodo.mockImplementation(() => Promise.resolve())
    expect.assertions(1)
    return expectDeleteStatusForId(23, 200)
  })

  test('return 500 if delete blows up', () => {
    const err = new Error('reasons')
    deleteTodo.mockImplementation(() => Promise.reject(err))
    expect.assertions(1)
    return expectDeleteStatusForId(23, 500)
  })
})

describe('PATCH /api/v1/todos/:id', () => {
  const fakeTodo = [{ id: 23, task: 'do things', completed: true }]
  beforeAll(() => {
    updateTodo.mockImplementation(() => Promise.resolve(fakeTodo))
    promise = request(server)
      .patch('/api/v1/todos/23')
      .send({ completed: true })
  })

  test('call update Todo db function', () => {
    expect.assertions(2)
    return promise.then((res) => {
      expect(updateTodo.mock.calls[0][0]).toBe(23)
      expect(updateTodo.mock.calls[0][1]).toEqual({ completed: true })
      return null
    })
  })

  test('return the whole todo', () => {
    expect.assertions(2)
    return promise.then((res) => {
      expect(res.status).toBe(200)
      expect(res.body).toEqual(fakeTodo)
      return null
    })
  })

  describe('when db call fails', () => {
    test('returns 500', () => {
      jest.clearAllMocks()
      const err = new Error('no good')
      updateTodo.mockImplementation(() => Promise.reject(err))
      return request(server).patch('/api/v1/todos/23')
        .then((res) => {
          expect(res.status).toBe(500)
          return null
        })
    })
  })
})

function expectDeleteStatusForId (id, status) {
  return request(server)
    .delete('/api/v1/todos/' + id)
    .then((res) => {
      expect(res.status).toBe(status)
      return null
    })
}
