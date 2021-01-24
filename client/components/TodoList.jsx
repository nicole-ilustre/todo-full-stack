import React from 'react'
import { useSelector } from 'react-redux'

import TodoListItem from './TodoListItem'

function TodoList () {
  const todos = useSelector((state) => state.todos)
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
