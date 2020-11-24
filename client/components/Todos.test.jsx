import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import Todos from './Todos'

import { fetchTodos } from '../actions'
jest.mock('../actions', () => ({
  fetchTodos: jest.fn()
}))

const store = {
  getState: jest.fn(),
  dispatch: jest.fn(),
  subscribe: jest.fn()
}

store.getState.mockImplementation(() => ({
  todos: [
    { id: 1, task: 'do a thing', completed: true },
    { id: 2, task: 'do another thing', completed: false },
    { id: 3, task: 'do more things', completed: false }
  ]
}))

describe('<Todos />', () => {
  test('list out todos from redux', async () => {
    render(<Provider store={store}><Todos /></Provider>)
    const items = await screen.findAllByRole('listitem')
    expect(items).toHaveLength(3)
  })
  test('loads todos from api on intial mount', () => {
    render(<Provider store={store}><Todos /></Provider>)
    expect(store.dispatch).toHaveBeenCalled()
    expect(fetchTodos).toHaveBeenCalled()
  })
})
