import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from '../actions/index'

export function todo (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.todo]
    case DELETE_TODO:
      return state
    case UPDATE_TODO:
      return state
    default:
      return state
  }
}
