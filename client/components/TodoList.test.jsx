import React from 'react'
import { screen } from '@testing-library/react'

import TodoList from './TodoList'
import { renderWithRedux } from '../testUtils'

describe('TodoList', () => {
  it('renders the correct number of items', () => {
    const initialState = {
      todos: [
        { id: 1, title: 'test 1', completed: true },
        { id: 2, title: 'test 2', completed: false }
      ]
    }
    renderWithRedux(<TodoList />, { initialState })
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
  })
})
