import React from 'react'
import { Provider } from 'react-redux'
import { screen, render, fireEvent, cleanup } from '@testing-library/react'

import Todo from './Todo'
import { removeTodo, updateTodo } from '../actions'
import { fakeStore } from '../testHelpers'

jest.mock('../actions', () => ({
  removeTodo: jest.fn(),
  updateTodo: jest.fn()
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
    render(<Provider store={fakeStore}><Todo todo={todo} /></Provider>)
  })

  test('no className on li when incomplete', async () => {
    const li = await screen.getByRole('listitem')
    expect(li.className).toBe('')
  })

  test('completed className on li', async () => {
    todo.completed = true
    cleanup()
    render(<Provider store={fakeStore}><Todo todo={todo} /></Provider>)
    const li = await screen.getByRole('listitem')
    expect(li.className).toBe('completed')
  })
  test('shows task in label', async () => {
    const label = await screen.getByText(todo.task)
    expect(label).not.toBeUndefined()
  })

  test('clicking delete button dispatches removeTodo action', async () => {
    const button = await screen.getByRole('button')
    fireEvent.click(button)
    expect(fakeStore.dispatch).toHaveBeenCalled()
    expect(removeTodo).toHaveBeenCalledWith(todo.id)
  })

  test('checking toggle sends updateTask action, toggling completed', async () => {
    jest.clearAllMocks()
    const checkbox = await screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(fakeStore.dispatch).toHaveBeenCalled()
    expect(updateTodo.mock.calls[0][0]).toBe(todo.id)
    expect(updateTodo.mock.calls[0][1]).toEqual({ completed: true })

    fireEvent.click(checkbox)
    expect(fakeStore.dispatch).toHaveBeenCalledTimes(2)
    expect(updateTodo.mock.calls[1][0]).toBe(todo.id)
    expect(updateTodo.mock.calls[1][1]).toEqual({ completed: false })
  })
})
