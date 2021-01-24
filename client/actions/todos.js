export const RECEIVED_TODOS = 'RECEIVED_TODOS'

export function receiveTodos (todos) {
  return {
    type: RECEIVED_TODOS,
    todos: todos
  }
}
