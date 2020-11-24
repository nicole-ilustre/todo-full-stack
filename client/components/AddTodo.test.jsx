import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

import AddTodo from './AddTodo'
import { saveTodo } from '../actions'

import { fakeStore } from '../testHelpers'

const fakeAction = { type: 'fakeAction' }
jest.mock('../actions', () => ({
  saveTodo: jest.fn(() => fakeAction)
}))

describe('<AddTodo />', () => {
  let input
  beforeEach(() => {
    render(<Provider store={fakeStore}><AddTodo /></Provider>)
    input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new task' } })
    fireEvent.submit(input)
  })
  test('submitting an input dispatches saveTodo action', () => {
    expect(fakeStore.dispatch).toHaveBeenCalledWith(fakeAction)
    expect(saveTodo).toHaveBeenCalledWith('new task')
  })
  test('submitting input clears input value', () => {
    expect(input.value).toBe('')
  })
})
