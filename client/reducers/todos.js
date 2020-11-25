import { ADD_TODO, SET_TODOS, DELETE_TODO, SET_TODO } from '../actions'

export default function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO :
      return [...state, action.todo]

    case SET_TODOS :
      return action.todos

    case DELETE_TODO :
      return state.filter(todo => todo.id !== action.id)

    case SET_TODO :
      return state.map(todo => todo.id === action.todo.id ? action.todo : todo)

    default :
      return state
  }
}
