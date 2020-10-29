import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeAllCompleted } from '../actions'

function Footer (props) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.activeTodoCount}</strong> item{props.activeTodoCount > 1 ? 's' : ''} left
      </span>

      <ul className="filters">
        <li>
          <Link className={!props.filter ? 'selected' : ''} to="/">
            All
          </Link>
        </li>
        <li>
          <Link to="/active" className={props.filter === 'active' ? 'selected' : ''}>
            Active
          </Link>
        </li>
        <li>
          <Link to="/completed" className={props.filter === 'completed' ? 'selected' : ''}>
            Completed
          </Link>
        </li>
      </ul>

      {props.completedTodoCount > 0 && (
        <button className="clear-completed" onClick={() => props.dispatch(removeAllCompleted())}>
          Clear completed
        </button>
      )}
    </footer>
  )
}

export default connect()(Footer)
