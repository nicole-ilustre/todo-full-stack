import { connect } from 'react-redux'

import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Todos from './Todos'

function Main (props) {
  const { filter, activeTodoCount, completedTodoCount } = props
  let todos = props.todos
  if (filter) todos = props.todos.filter(todo => (filter === 'active' && !todo.completed) || (filter === 'completed' && todo.completed))

  return (
    <>
      <Header />

      <section className="main">
        <Todos todos={todos} />
      </section>

      <Footer filter={filter} activeTodoCount={activeTodoCount} completedTodoCount={completedTodoCount} />
    </>
  )
}

function mapStateToProps (globalState) {
  return {
    todos: globalState.todos,
    activeTodoCount: globalState.todos.filter(t => !t.completed).length,
    completedTodoCount: globalState.todos.filter(t => t.completed).length
  }
}

export default connect(mapStateToProps)(Main)
