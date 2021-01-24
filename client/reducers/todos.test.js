import todos from './todos'
import { RECEIVED_TODOS } from '../actions/todos'

describe('todos reducer', () => {
  it('returns initial data by default', () => {
    const initial = [
      { id: 1, title: 'test 1', completed: true },
      { id: 2, title: 'test 2', completed: false }
    ]
    const newState = todos(initial, {})
    expect(newState).toEqual(initial)
  })

  it('returns todos when they are received', () => {
    const initial = []
    const action = {
      type: RECEIVED_TODOS,
      todos: [
        { id: 1, title: 'test 1', completed: true },
        { id: 2, title: 'test 2', completed: false }
      ]
    }
    const newState = todos(initial, action)
    expect(newState).not.toEqual(initial)
    expect(newState).toHaveLength(2)
  })
})
