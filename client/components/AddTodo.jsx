import React, { useContext, useState } from 'react'
import { addTodo } from '../apis/todos'
import { TodosContext } from './App'

function AddTodo () {
  const [todo, setTodo] = useState({ task: '' })
  const { refreshTodos } = useContext(TodosContext)

  const handleChange = (event) => {
    setTodo({
      ...todo,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (todo.task) {
      addTodo(todo)
        .then(refreshTodos)
        .catch(console.log)
    }
    setTodo({ task: '' })
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        name="task"
        value={todo.task}
        onChange={handleChange}
        placeholder="What needs to be done?"
        autoFocus={true}
      />
    </form>
  )
}

export default AddTodo
