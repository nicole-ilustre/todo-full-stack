import React, {useState} from 'react'
import { connect } from 'react-redux'

import { addNewTask } from '../actions/actions'

const initialTask = {
  name: '',
  urgency: '',
  completed: false
}

function AddTodo (props) {

  const [newTask, setTask] = useState(initialTask)

  function handleChange (evt) {
    evt.preventDefault()
    setTask({...newTask,
      name: evt.target.value
    })
  }

  function handleEnter (evt) {
    if (evt.code === 'Enter') {
      evt.preventDefault()
      props.dispatch(addNewTask(newTask))
      setTask(initialTask)
      return null
    }
  }

  return (
    <>
      <input className="new-todo" placeholder="What needs to be done?" autoFocus={true} value={newTask.name} onChange={handleChange} onKeyPress={handleEnter} />
    </>
  )
}

function mapStateToProps (state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(AddTodo)

