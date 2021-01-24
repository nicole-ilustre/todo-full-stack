import { RECEIVED_TODOS } from '../actions/todos'

const initialTodos = []

function todos (state = initialTodos, action) {
  switch (action.type) {
    case RECEIVED_TODOS:
      return action.todos
  }
  return state
}

export default todos
