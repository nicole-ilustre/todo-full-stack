import {postTodo} from '../apis'
export const ADD_TODO = 'ADD_TODO'
export const SET_ERROR = 'SET_ERROR'

function addTodo(todo) {
  return {
    type: ADD_TODO,
    todo: todo
  }
}

function setError(message) {
  return {
    type: SET_ERROR,
    message
  }
}

export function saveTodo(task) {
  return (dispatch => {
    postTodo(task)
      .then((newTodo) => {
        dispatch(addTodo(newTodo)) 
      })
      .catch(err => {
        dispatch(setError(err))
      })
  }) 
}