import todos from './todos'
import { addTodo } from '../actions'

describe('todos reducer', () => {
  test('initial state is an empty array', () => {
    const state = todos(undefined, { type: '_INIT_' })
    expect(state).toEqual([])
  })

  test('ADD_TODO adsd a todo to the state', () => {
    const fakeTodo = { task: 'do a thing' }
    const action = addTodo(fakeTodo)
    const state = todos(undefined, action)
    expect(state).toHaveLength(1)
    expect(state[0]).toEqual(fakeTodo)
  })
})
