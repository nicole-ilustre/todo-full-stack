import { saveTodo, fetchTodos, ADD_TODO, SET_ERROR, SET_TODOS } from './index'
import { postTodo, getTodos } from '../apis'

jest.mock('../apis', () => ({
  postTodo: jest.fn(),
  getTodos: jest.fn()
}))

const fakeDispatch = jest.fn()

describe('saveTodo', () => {
  describe('when api call successful', () => {
    const fakeTodo = { task: 'fake task' }
    beforeAll(() => {
      jest.clearAllMocks()
      postTodo.mockImplementation(() => Promise.resolve(fakeTodo))
      saveTodo('new task')(fakeDispatch)
    })

    test('call the saveTodo api method', () => {
      expect(postTodo).toHaveBeenCalledWith('new task')
    })

    test('dispatches a addTask action', () => {
      expect(fakeDispatch.mock.calls[0][0].type).toEqual(ADD_TODO)
    })

    test('addTodo is created with results from postTodo api call', () => {
      expect(fakeDispatch.mock.calls[0][0].todo).toEqual(fakeTodo)
    })
  })

  describe('when api call is unsuccessful', () => {
    const error = new Error('not happy')
    beforeAll(() => {
      jest.clearAllMocks()
      postTodo.mockImplementation(() => Promise.reject(error))
      saveTodo('new task')(fakeDispatch)
    })
    test('dispatches an error action', () => {
      expect(fakeDispatch.mock.calls[0][0].type).toEqual(SET_ERROR)
      expect(fakeDispatch.mock.calls[0][0].message).toEqual(error)
    })
  })
})

describe('fetchTodos', () => {
  describe('when api works', () => {
    const fakeTodos = [{ task: 'thing' }, { task: 'otherThing' }]
    beforeAll(() => {
      jest.clearAllMocks()
      getTodos.mockImplementation(() => Promise.resolve(fakeTodos))
    })
    test('call the getTodos api', () => {
      fetchTodos()(fakeDispatch)
      expect(getTodos).toHaveBeenCalled()
    })

    test('dispatch setTodos action with new todos', () => {
      expect(fakeDispatch.mock.calls[0][0].type).toEqual(SET_TODOS)
      expect(fakeDispatch.mock.calls[0][0].todos).toEqual(fakeTodos)
    })
  })

  describe("when api doesn't work", () => {
    beforeAll(() => {
      jest.clearAllMocks()
      const sadness = new Error('sadness')
      getTodos.mockImplementation(() => Promise.reject(sadness))
      fetchTodos()(fakeDispatch)
    })

    test('dispatch an error if the api does not work', () => {
      expect(fakeDispatch.mock.calls[0][0].type).toEqual(SET_ERROR)
    })
  })
})
