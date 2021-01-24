import { receiveTodos, RECEIVED_TODOS } from './todos'

describe('todo action creators', () => {
  it('receiveTodos creates proper action', () => {
    const fetchedTodos = [
      { id: 1, title: 'test todo 1', completed: true },
      { id: 2, title: 'test todo 2', completed: false }
    ]
    const action = receiveTodos(fetchedTodos)
    expect(action.type).toBe(RECEIVED_TODOS)
    expect(action.todos).toHaveLength(2)
    expect(action.todos[0].completed).toBeTruthy()
    expect(action.todos[1].title).toMatch('test todo 2')
  })
})
