import React from 'react'
import AddTodo from './AddTodo'

function Header () {
  return (
    <header className="header">
      <h1>todos</h1>
      <AddTodo />
    </header>
  )
}

export default Header
