import React from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import ToggleAllComplete from './ToggleAllComplete'
import InfoFilter from './InfoFilter'

function App () {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className="main">
        <ToggleAllComplete />
        <TodoList />
        <InfoFilter />
      </section>
    </>
  )
}

export default App
