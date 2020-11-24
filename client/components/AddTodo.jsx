import React from 'react'
import {connect} from 'react-redux'

import {saveTodo} from '../actions'

class AddTodo extends React.Component {
  state = {task: ''}

  handleChange = (e) => {
    this.setState({task: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let action = saveTodo(this.state.task)
    this.props.dispatch(action)
    this.setState({task: ''})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          onChange={this.handleChange} 
          value={this.state.task} 
          className="new-todo" 
          placeholder="What needs to be done?" 
          autoFocus={true} />
      </form>
    )
  }
}

export default connect()(AddTodo)
