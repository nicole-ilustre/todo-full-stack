import request from 'superagent'

export function postTodo (task) {
  return request
    .post('/api/v1/todos')
    .send({ task })
    .then(response => response.body)
}

export function getTodos () {
  return request
    .get('/api/v1/todos')
    .then(response => response.body)
}

export function deleteTodo (id) {
  return request
    .delete('/api/v1/todos/' + id)
}

export function patchTodo (id, patchData) {
  return request
    .patch('/api/v1/todos/' + id)
    .send(patchData)
    .then(res => res.body)
}
