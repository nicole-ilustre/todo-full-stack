import request from 'superagent'

const serverUrl = 'http://localhost:3000/v1/todos'

export function getTodos () {
  return request.get(serverUrl)
    .then(res => res.body)
}

export function getCompletedTasks () {
  return request
    .get(serverUrl + '/completed')
    .then(res => res.body)
}

export function addTodo (todo) {
  return request
    .post(serverUrl)
    .send(todo)
    .then(res => res.body)
}

export function deleteTodo (id) {
  return request
    .delete(serverUrl + '/' + id)
    .then(res => res.body)
}

export function updateTodo (id) {
  return request
    .patch(serverUrl + '/completed/' + id)
    .then(res => res.body)
}