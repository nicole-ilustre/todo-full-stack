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
