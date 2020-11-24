import React from 'react'
import { Provider } from 'react-redux'
import { screen, render, fireEvent } from '@testing-library/react'

import Todo from './Todo'
import { removeTodo } from '../actions'
import { fakeStore } from '../testHelpers'

jest.mock('../actions', () => ({
  removeTodo: jest.fn()
}))

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
    render(<Provider store={fakeStore}><Todo todo={todo} /></Provider>)
    const li = await screen.getByRole('listitem')
    expect(li.className).toBe('')
  })

  test('completed className on li', async () => {
    todo.completed = true
    render(<Provider store={fakeStore}><Todo todo={todo} /></Provider>)
    const li = await screen.getByRole('listitem')
    expect(li.className).toBe('completed')
  })
  test('shows task in label', async () => {
    render(<Provider store={fakeStore}><Todo todo={todo} /></Provider>)
    const label = await screen.getByText(todo.task)
    expect(label).not.toBeUndefined()
  })

  test('dispatches removeTodo action when delete button clicked', async () => {
    render(<Provider store={fakeStore}><Todo todo={todo} /></Provider>)
    const button = await screen.getByRole('button')
    fireEvent.click(button)
    expect(fakeStore.dispatch).toHaveBeenCalled()
    expect(removeTodo).toHaveBeenCalledWith(todo.id)
  })
})
