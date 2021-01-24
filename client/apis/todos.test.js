import { fetchTodos } from './todos'
import { RECEIVED_TODOS } from '../actions/todos'

jest.mock('../store')

describe('todo api calls', () => {
  it('dispatches todos on success', () => {
    expect.assertions(3)

    const consume = (endpoint) => {
      expect(endpoint).toBe('/todos')
      return Promise.resolve({
        body: {
          todos: [
            { id: 1, title: 'test todo 1', completed: true },
            { id: 2, title: 'test todo 2', completed: false }
          ]
        }
      })
    }

    const dispatch = (action) => {
      expect(action.type).toBe(RECEIVED_TODOS)
      expect(action.todos).toHaveLength(2)
    }

    return fetchTodos(consume, dispatch)
  })
})
