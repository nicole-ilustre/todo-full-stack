import request from 'superagent'

const apiBase = '/todos'

export function getTodos () {
  return request.get(apiBase).then(res => res.body)
}

export function addTodo (todo) {
  return request
    .post(apiBase)
    .send(todo)
    .then(res => res.body)
}

export function updateTodo (id, todo) {
  return request
    .patch(apiBase + '/' + id)
    .send(todo)
    .then(res => res.body)
}

export function deleteTodo (id) {
  return request.delete(apiBase + '/' + id).then(res => res.body)
}

export function deleteAllTodos (ids) {
  return Promise.all(ids.map(id => deleteTodo(id)))
}
