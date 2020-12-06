import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { getTodos } from '../apis/todos'
import Main from './Main'

export const TodosContext = React.createContext([])

function App () {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    refreshTodos()
  }, [])

  const refreshTodos = () => {
    getTodos()
      .then((allTodos) => {
        setTodos(allTodos)
        return null
      })
      .catch(console.log)
  }

  return (
    <Router>
      <Route
        path="/:filter?"
        render={routeProps => {
          const filter = routeProps.match.params.filter

          return (
            <>
              <TodosContext.Provider value={{ todos: todos, refreshTodos: refreshTodos }}>
                <Main filter={filter} />
              </TodosContext.Provider>
            </>
          )
        }}
      />
    </Router>
  )
}

export default App
