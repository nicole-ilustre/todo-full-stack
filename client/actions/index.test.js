import {saveTodo, ADD_TODO, SET_ERROR} from './index'
import {postTodo} from '../apis'

jest.mock('../apis', () => ({
  postTodo: jest.fn()
}))

describe('saveTodo', () => {
  let fakeDispatch = jest.fn()

  describe("when api call successful", () => {
    const fakeTodo = { task: 'fake task' }
    beforeAll(() => {
      postTodo.mockImplementation(() => Promise.resolve(fakeTodo)) 
      saveTodo('new task')(fakeDispatch)
    })

    test("call the saveTodo api method", () => {
      expect(postTodo).toHaveBeenCalledWith('new task')
    })

    test("dispatches a addTask action", () => {
      expect(fakeDispatch.mock.calls[0][0].type).toEqual(ADD_TODO)
    })

    test("addTodo is created with results from postTodo api call", () => {
      expect(fakeDispatch.mock.calls[0][0].todo).toEqual(fakeTodo)
    })
  })

  describe("when api call is unsuccessful", () => {
    beforeAll(() => {
      jest.clearAllMocks()
      postTodo.mockImplementation(() => Promise.reject('not happy')) 
      saveTodo('new task')(fakeDispatch)
    })
    test("dispatches an error action", () => {
      expect(fakeDispatch.mock.calls[0][0].type).toEqual(SET_ERROR)
      expect(fakeDispatch.mock.calls[0][0].message).toEqual('not happy')
    })
  })
})