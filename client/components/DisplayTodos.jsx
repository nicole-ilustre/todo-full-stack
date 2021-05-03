import React, { useEffect, useState } from 'react'
import { getTodos } from '../apis/apiClient'

export default function DisplayTodos () {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    getTodos()
      .then(todos => setTodos(todos))
      .catch(err => console.error(err.message))
  }, [])

  return (
    <>
      {todos.map((todo, i) => <li key={i}>{todo.todo}</li>)}
    </>
  )
}