import todos from './todos'

describe('todos reducer', () => {
  it('shows initial data by default', () => {
    const initial = [
      { id: 1, title: 'test 1', completed: true },
      { id: 2, title: 'test 2', completed: false }
    ]
    const newState = todos(initial)
    expect(newState).toEqual(initial)
  })
})
