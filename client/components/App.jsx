import React from 'react'
import AddTodo from './AddTodo'
import Todos from './Todos'

class App extends React.Component {
  componentDidMount () {}

  render () {
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <AddTodo />
        </header>
        <section className="main">
          <Todos />
        </section>
        <footer className="footer"></footer>
      </>
    )
  }
}

export default App
