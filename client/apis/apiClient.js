import request from 'superagent'

const serverUrl = 'http://localhost:3000/v1/todos'

export function getTodosApi () {
  return request.get(serverUrl)
    .then(res => res.body)
}

export function getCompletedTasksApi () {
  return request
    .get(serverUrl + '/completed')
    .then(res => res.body)
}

export function addTodoApi (todo) {
  return request
    .post(serverUrl)
    .send(todo)
    .then(res => res.body)
}

export function deleteTodoApi (id) {
  return request
    .patch(serverUrl + '/' + id)
    .then(res => res.body)
}

export function updateTodoApi (id) {
  return request
    .patch(serverUrl + '/completed/' + id)
    .then(res => res.body)
}