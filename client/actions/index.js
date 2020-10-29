import { addTodo, deleteTodo, getTodos, updateTodo } from '../apis/todos'

export const SET_TODOS = 'SET_TODOS'

export function setTodos (todos) {
  return {
    type: SET_TODOS,
    todos
  }
}

export function fetchTodos () {
  return dispatch => {
    return getTodos()
      .then(todos => {
        dispatch(setTodos(todos))
      })
  }
}

export function createTodo (todo) {
  return dispatch => {
    return addTodo(todo)
      .then(() => {
        dispatch(fetchTodos())
      })
  }
}

export function modifyTodo (id, todo) {
  return dispatch => {
    return updateTodo(id, todo)
      .then(() => {
        dispatch(fetchTodos())
      })
  }
}

export function removeTodo (id) {
  return dispatch => {
    return deleteTodo(id)
      .then(() => {
        dispatch(fetchTodos())
      })
  }
}

export function removeAllCompleted () {
  return (dispatch, getState) => {
    const { todos } = getState()
    const ids = todos.filter(todo => todo.completed).map(todo => todo.id)

    return Promise.all(ids.map(id => deleteTodo(id)))
      .then(() => {
        dispatch(fetchTodos())
      })
  }
}
