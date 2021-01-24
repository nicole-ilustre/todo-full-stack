import store from '../store'
import consume from './consume'
import { receiveTodos } from '../actions/todos'

export function fetchTodos (request = consume, dispatch = store.dispatch) {
  return request('/todos')
    .then((res) => {
      dispatch(receiveTodos(res.body.todos))
      return null
    })
}
