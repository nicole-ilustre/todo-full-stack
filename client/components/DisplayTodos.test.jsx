import React from 'react'
import { render, screen } from '@testing-library/react'

import DisplayTodos from './DisplayTodos'

test('displays todo list', () => {
  const todos = [{ id: 1, todo: 'breakfast' },
    { id: 2, todo: 'lunch' }]
  render(<DisplayTodos todos={todos}/>)
  const input = screen.queryAllByRole('button')
  expect(input).toHaveLength(2)
})