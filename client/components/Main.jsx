import React, { useContext } from 'react'
import Header from './Header'
import Footer from './Footer'
import Todos from './Todos'
import { TodosContext } from './App'

function Main (props) {
  const { todos } = useContext(TodosContext)
  const activeTodoCount = todos.filter(t => !t.completed).length
  const completedTodoCount = todos.filter(t => t.completed).length
  const filter = props.filter

  let filteredTodos = todos
  if (filter) filteredTodos = todos.filter(todo => (filter === 'active' && !todo.completed) || (filter === 'completed' && todo.completed))

  return (
    <>
      <Header />

      <section className="main">
        <Todos todos={filteredTodos} />
      </section>

      <Footer filter={filter} activeTodoCount={activeTodoCount} completedTodoCount={completedTodoCount} />
    </>
  )
}

export default Main
