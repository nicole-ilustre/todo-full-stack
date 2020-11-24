import React from 'react'
import { connect } from 'react-redux'
import { removeTodo } from '../actions'

const Todo = ({ todo, dispatch }) => {
  const handleClick = (e) => {
    dispatch(removeTodo(todo.id))
  }
  const className = todo.completed ? 'completed' : ''
  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>{todo.task}</label>
        <button onClick={handleClick} className="destroy"></button>
      </div>
      {/* <input className="edit" value="Create a TodoMVC template" /> */}
    </li>
  )
}

export default connect()(Todo)
