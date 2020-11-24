import { postTodo } from '../apis'
export const ADD_TODO = 'ADD_TODO'
export const SET_ERROR = 'SET_ERROR'

export function addTodo (todo) {
  return {
    type: ADD_TODO,
    todo: todo
  }
}

function setError (message) {
  return {
    type: SET_ERROR,
    message
  }
}

export function saveTodo (task) {
  return dispatch => {
    postTodo(task)
      .then((newTodo) => {
        return dispatch(addTodo(newTodo))
      })
      .catch(err => {
        return dispatch(setError(err))
      })
  }
}
