import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import DisplayTodos from './DisplayTodos'
import { getTodosApi } from '../apis/apiClient'

function App () {
  const [todos, setTodos] = useState([])

  function loadTodos () {
    getTodosApi()
      .then(todos => setTodos(todos))
      .catch(err => console.error(err.message))
  }
  useEffect(() => {
    loadTodos()
  }, [])

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo loadTodos={loadTodos}/>
        <DisplayTodos todos={todos}
          loadTodos={loadTodos}/>
      </header>
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
