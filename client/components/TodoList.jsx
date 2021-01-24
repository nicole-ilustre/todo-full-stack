import React from 'react'

import TodoListItem from './TodoListItem'

const testTodos = [
  {
    id: 1,
    title: 'Taste JavaScript',
    completed: true
  },
  {
    id: 2,
    title: 'Buy a unicorn',
    completed: false
  }
]

function TodoList (props) {
  const todos = props.todos || testTodos
  return (
    <>
      <ul className='todo-list'>
        {
          todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} />
          ))
        }
      </ul>
    </>
  )
}

export default TodoList
