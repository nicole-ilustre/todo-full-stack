import React, { useEffect } from 'react'
import AddTodo from './AddTodo'
import DisplayTodos from './DisplayTodos'

function App () {
  useEffect(() => {

  }, [])

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <DisplayTodos />
        <AddTodo />
      </header>
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
