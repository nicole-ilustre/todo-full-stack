
function tasks (state = [],action) {
  switch (action.type) {
    case 'GET_TASKS': 
      return action.tasks

    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.id)

    default:
      return state
  }
}

export default tasks