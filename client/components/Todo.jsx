import React from 'react'

const Todo = ({ todo }) => {
  const className = todo.completed ? 'completed' : ''
  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>{todo.task}</label>
        <button className="destroy"></button>
      </div>
      {/* <input className="edit" value="Create a TodoMVC template" /> */}
    </li>
  )
}

export default Todo
