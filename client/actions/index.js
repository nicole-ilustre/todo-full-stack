export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export function addTodo (todo) {
  return {
    type: ADD_TODO,
    todo: todo
  }
}

export function deleteTodo (id) {
  return {
    type: DELETE_TODO,
    id: id
  }
}

export function updateTodo (id) {
  return {
    type: UPDATE_TODO,
    id: id
  }
}