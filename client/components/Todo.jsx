import React, { useContext, useEffect, useState } from 'react'
import { deleteTodo, updateTodo } from '../apis/todos'
import { TodosContext } from './App'

function Todo (props) {
  const todo = props.todo
  const { refreshTodos } = useContext(TodosContext)

  const editInput = React.createRef()

  const [editing, setEditing] = useState(false)
  const [updatedTask, setUpdatedTask] = useState(false)

  useEffect(() => {
    setUpdatedTask(props.todo.task)
  }, [props.todo.id])

  useEffect(() => {
    if (editing) editInput.current.focus()
  }, [editing])

  const handleTick = () => {
    updateTodo(todo.id, { completed: !todo.completed })
      .then(refreshTodos)
      .catch(console.log)
  }
  const handleDelete = () => {
    deleteTodo(todo.id)
      .then(refreshTodos)
      .catch(console.log)
  }
  const handleSubmit = e => {
    e.preventDefault()
    updateTodo(todo.id, { task: updatedTask })
      .then(refreshTodos)
      .catch(console.log)
    setEditing(false)
  }

  return (
    <li
      className={[todo.completed ? 'completed' : '', editing ? 'editing' : ''].join(' ')}
      onBlur={() => setEditing(false)}
    >
      <div className="view">
        <input className="toggle" type="checkbox" checked={todo.completed} onChange={handleTick} />
        <label onDoubleClick={() => setEditing(true)}>
          {updatedTask}
        </label>
        <button className="destroy" onClick={handleDelete}></button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="edit"
          name="updatedTask"
          ref={editInput}
          value={updatedTask}
          onChange={event => setUpdatedTask(event.target.value)}
        />
      </form>
    </li>
  )
}

export default Todo
