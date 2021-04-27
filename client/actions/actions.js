import { listTasks, addToTasks, deleteATask } from '../apis/apiClient'

export function getTasks (tasks) {
  return {
    type: 'GET_TASKS',
    tasks: tasks
  }
}

// export function addTask (newTask) {
//   return {
//     type: 'ADD_TASK',
//     newTask: newTask
//   }
// }

export function deleteTask (id) {
  return {
    type: 'DELETE_TASK',
    id: id
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

export function addNewTask (newTask) {
  return (dispatch) => {
    addToTasks(newTask)
    .then(() => {
      return null
    })
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

export function deleteExistingTask (id) {
  return (dispatch) => {
    deleteATask(id)
    .then(() => {
      return dispatch(deleteTask(id))
    })
    .catch(err => {
      console.log(err.message)
    })
    
  }
}


