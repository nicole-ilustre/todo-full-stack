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

  test('checking toggle sends updateTask action', async () => {
    jest.clearAllMocks()
    const checkbox = await screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(fakeStore.dispatch).toHaveBeenCalled()
    expect(updateTodo.mock.calls[0][0]).toBe(todo.id)
    expect(updateTodo.mock.calls[0][1]).toEqual({ completed: true })
  })

  describe('editing', () => {
    test('input field is hidden when not editing', async () => {
      const input = await screen.queryByRole('textbox')
      expect(input).toBeNull()
    })
    test('clicking the label shows the edit field', async () => {
      const label = await screen.getByText(todo.task)
      fireEvent.click(label)
      const input = await screen.getByRole('textbox')
      expect(input).not.toBeNull()
      const listitem = await screen.getByRole('listitem')
      expect(listitem.className).toContain('editing')
    })
    test('submitting edit field dispatches an updateTodo action', async () => {
      const awesomeTask = 'make a pen pineapple apple pen'
      jest.clearAllMocks()
      const label = await screen.getByText(todo.task)
      fireEvent.click(label)
      const input = await screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: awesomeTask } })
      fireEvent.submit(input)
      expect(fakeStore.dispatch).toHaveBeenCalled()
      expect(updateTodo.mock.calls[0][0]).toBe(todo.id)
      expect(updateTodo.mock.calls[0][1]).toEqual({ task: awesomeTask })
    })
  })

  describe('a completed component', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      todo.completed = true
      cleanup()
      render(<Provider store={fakeStore}><Todo todo={todo} /></Provider>)
    })

    test('unchecking toggle sends updateTask action', async () => {
      const checkbox = await screen.getByRole('checkbox')
      fireEvent.click(checkbox)
      expect(fakeStore.dispatch).toHaveBeenCalled()
      expect(updateTodo.mock.calls[0][0]).toBe(todo.id)
      expect(updateTodo.mock.calls[0][1]).toEqual({ completed: false })
    })

    test('set class to completed and check input', async () => {
      const li = await screen.getByRole('listitem')
      expect(li.className).toBe('completed')
      const checkbox = await screen.getByRole('checkbox')
      expect(checkbox.checked).toBe(true)
    })

    test('disable editing', async () => {
      const label = await screen.getByText(todo.task)
      fireEvent.click(label)
      const listItem = await screen.getByRole('listitem')
      expect(listItem.className).not.toContain('editing')
    })
  })
})
