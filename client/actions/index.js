import { postTodo, getTodos } from '../apis'
export const ADD_TODO = 'ADD_TODO'
export const SET_ERROR = 'SET_ERROR'
export const SET_TODOS = 'SET_TODOS'

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

export function setTodos (todos) {
  return {
    type: SET_TODOS,
    todos
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

export function fetchTodos () {
  return dispatch => {
    getTodos()
      .then(todos => {
        return dispatch(setTodos(todos))
      })
      .catch(err => {
        return dispatch(setError(err))
      })
  }
}
