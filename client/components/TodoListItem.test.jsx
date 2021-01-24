import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import TodoListItem from './TodoListItem'

describe('TodoListItem', () => {
  it('renders the item correctly', () => {
    const testTodo = {
      id: 1, title: 'test item 1', completed: true
    }

    render(<TodoListItem todo={testTodo} />)

    const item = screen.getByText('test item 1')
    expect(item).toBeInTheDocument()

    const checkbox = screen.getByRole('checkbox', { checked: true })
    expect(checkbox).toBeInTheDocument()

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
