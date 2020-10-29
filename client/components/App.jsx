import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import { fetchTodos } from '../actions'
import Main from './Main'

class App extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchTodos())
  }

  render () {
    return (
      <Router>
        <Route
          path="/:filter?"
          render={routeProps => {
            const filter = routeProps.match.params.filter

            return (
              <>
                <Main filter={filter} />
              </>
            )
          }}
        />
      </Router>
    )
  }
}

export default connect()(App)
