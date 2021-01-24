import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import TodoListItem from './TodoListItem'
import { fetchTodos } from '../apis/todos'

function TodoList () {
  useEffect(() => {
    fetchTodos()
  }, [])

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
