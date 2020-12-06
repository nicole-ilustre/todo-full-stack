import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { deleteAllTodos } from '../apis/todos'
import { TodosContext } from './App'

function Footer (props) {
  const { todos, refreshTodos } = useContext(TodosContext)

  const removeAllCompleted = () => {
    const ids = todos.filter(todo => todo.completed).map(todo => todo.id)
    deleteAllTodos(ids)
      .then(refreshTodos)
      .catch(console.log)
  }

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
        <button className="clear-completed" onClick={() => removeAllCompleted()}>
          Clear completed
        </button>
      )}
    </footer>
  )
}

export default Footer
