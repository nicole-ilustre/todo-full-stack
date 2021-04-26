import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo'

import { listTasks } from '../apis/apiClient'

function App () {

  const [tasks, setTasks] = useState([{}])

  useEffect(() => {
    listTasks()
      .then(result => {
        setTasks(result)
        console.log(tasks)
      })
  }, [])

  console.log(tasks)

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

export default App
