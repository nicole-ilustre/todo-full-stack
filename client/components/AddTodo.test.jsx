import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, screen } from '@testing-library/react'

import AddTodo from './AddTodo'
import { addNewTask } from '../actions/actions'

jest.mock('./AddTodo.jsx')

describe('AddTodo', () => {
  test('dispatches to redux', () => {
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn()
    }
    store.getState.mockImplementation(() => {
      return { tasks: [] }
    })

    store.dispatch.mockImplementation(() => Promise.resolve([]))

    render(<Provider store={store}><AddTodo/></Provider>)
    const input = screen.getAllByRole('textbox')[0]
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })

    expect(store.dispatch).toHaveBeenCalled()
  })
})
