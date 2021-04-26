import request from 'superagent'

const tasksUrl = '/api/v1/'

export function listTasks () {
  return request
    .get(tasksUrl)
    .then(res => res.body)
}