import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import { connect } from 'react-redux'

function App (props) {

  useEffect(() => {

  }, [])

  console.log(props)

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

function mapStateToProps (state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App)
