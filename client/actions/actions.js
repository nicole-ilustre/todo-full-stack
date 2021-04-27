import { listTasks } from '../apis/apiClient'

export function getTasks (tasks) {
  return {
    type: 'GET_TASKS',
    tasks: tasks
  }
}

export function listAllTasks () {
  return (dispatch) => {
    listTasks()
    .then(results => {
      dispatch(getTasks(results))
      return null
    })
    .catch(err => {
      console.log(err.message)
    })
  }
}


