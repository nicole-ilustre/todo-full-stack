import { postTodo, getTodos, deleteTodo, patchTodo } from '../apis'
export const ADD_TODO = 'ADD_TODO'
export const SET_ERROR = 'SET_ERROR'
export const SET_TODOS = 'SET_TODOS'
export const SET_TODO = 'SET_TODO'
export const DELETE_TODO = 'DELETE_TODO'

export function addTodo (todo) {
  return { type: ADD_TODO, todo: todo }
}

function setError (message) {
  return { type: SET_ERROR, message }
}

export function setTodos (todos) {
  return { type: SET_TODOS, todos }
}

export function setTodo (todo) {
  return { type: SET_TODO, todo }
}

export function createDeleteTodo (id) {
  return { type: DELETE_TODO, id }
}

export function saveTodo (task) {
  return dispatch => {
    postTodo(task)
      .then((newTodo) => dispatch(addTodo(newTodo)))
      .catch(err => dispatch(setError(err)))
  }
}

export function fetchTodos () {
  return dispatch => {
    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .catch(err => dispatch(setError(err)))
  }
}

export function removeTodo (id) {
  return dispatch => {
    deleteTodo(id)
      .then(() => dispatch(createDeleteTodo(id)))
      .catch(err => dispatch(setError(err)))
  }
}

export function updateTodo (id, patchData) {
  return dispatch => {
    patchTodo(id, patchData)
      .then((todo) => dispatch(setTodo(todo)))
      .catch(err => dispatch(setError(err)))
  }
}
