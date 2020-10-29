import React from 'react'
import Todo from './Todo'

function Todos (props) {
  return (
    <ul className="todo-list">
      {props.todos.map(todo => {
        return <Todo todo={todo} key={todo.id} />
      })}
    </ul>
  )
}

export default Todos
