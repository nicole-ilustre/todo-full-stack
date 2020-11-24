import React from 'react'
import Todo from './Todo'
import { screen, render } from '@testing-library/react'

describe('<Todo />', () => {
  let todo
  beforeEach(() => {
    todo = {
      id: 1,
      task: 'do stuff',
      completed: false,
      priority: null
    }
  })

  test('no className on li when incomplete', async () => {
    render(<Todo todo={todo} />)
    const li = await screen.getByRole('listitem')
    expect(li.className).toBe('')
  })

  test('completed className on li', async () => {
    todo.completed = true
    render(<Todo todo={todo} />)
    const li = await screen.getByRole('listitem')
    expect(li.className).toBe('completed')
  })
  test('shows task in label', async () => {
    render(<Todo todo={todo} />)
    const label = await screen.getByText(todo.task)
    expect(label).not.toBeUndefined()
  })
})
