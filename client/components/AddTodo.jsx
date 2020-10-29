import React from 'react'
import { connect } from 'react-redux'
import { createTodo } from '../actions'

class AddTodo extends React.Component {
  state = {
    task: ''
  }

  handleChange = e => {
    e.preventDefault()

    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (this.state.task) this.props.dispatch(createTodo({ task: this.state.task }))

    this.setState({ task: '' })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          name="task"
          value={this.state.task}
          onChange={this.handleChange}
          placeholder="What needs to be done?"
          autoFocus={true}
        />
      </form>
    )
  }
}

export default connect()(AddTodo)
