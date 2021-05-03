import React, { useState } from 'react'
import { addTodo } from '../apis/apiClient'

function AddTodo (props) {
  const [todo, setTodo] = useState({})

  function handleChange (e) {
    const newTodo = {
      todo: e.target.value
    }
    setTodo(newTodo)
  }

  function handleSubmit (e) {
    e.preventDefault()
    addTodo(todo)
    props.loadTodos()
  }
  return (
    <>
      <input value={todo.todo} onChange={handleChange} className="new-todo" placeholder="What needs to be done?" autoFocus={true} />
      <button className="add" onClick={handleSubmit}>ADD</button>
    </>
  )
}

export default AddTodo
