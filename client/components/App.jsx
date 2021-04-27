import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import { connect } from 'react-redux'

import { listAllTasks } from '../actions/actions'

function App (props) {

  useEffect(() => {
    props.dispatch(listAllTasks())
  }, [])

  const { tasks } = props

  const listTheTasks = tasks.map(item => {
    if (item.completed) {
      return <li className="completed" key={item.id}>
          <div className="view">
            <input className="toggle" type="checkbox" checked />
            <label>{item.name}</label>
            <button className="destroy"></button>
          </div>
        <input className="edit" value="Create a TodoMVC template" />
        </li>
    } else {
      return <li>
          <div className="view" key={item.id}>
            <input className="toggle" type="checkbox" />
            <label>{item.name}</label>
            <button className="destroy"></button>
          </div>
          <input className="edit" value="Rule the web" />
        </li>
    }
  })

  return (
    <>
    <section id="app" className="todoapp">

      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>

      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label>Mark all as complete</label>
        <ul className="todo-list">
          {listTheTasks}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count"><strong>0</strong> item left</span>
        <ul className="filters">
          <li>
            <a class="selected" href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>

    </section>
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>Created by <a href="http://todomvc.com">Ysabel</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
    </>
  )
}

function mapStateToProps (state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App)
