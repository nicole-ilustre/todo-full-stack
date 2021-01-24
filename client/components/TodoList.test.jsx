import React from 'react'
import { screen } from '@testing-library/react'

import TodoList from './TodoList'
import { fetchTodos } from '../apis/todos'
import { renderWithRedux } from '../testUtils'

jest.mock('../apis/todos')

describe('TodoList', () => {
  it('renders the correct number of items', () => {
    const initialState = {
      todos: [
        { id: 1, title: 'test 1', completed: true },
        { id: 2, title: 'test 2', completed: false }
      ]
    }
    fetchTodos.mockImplementation(() => Promise.resolve())
    renderWithRedux(<TodoList />, { initialState })
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
  })
})
