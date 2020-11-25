import React from 'react'
import { connect } from 'react-redux'
import { removeTodo, updateTodo } from '../actions'

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      edit: false,
      task: props.todo.task
    }
  }

  handleCheck = (e) => {
    const { dispatch, todo } = this.props
    dispatch(updateTodo(todo.id, { completed: e.target.checked }))
  }

  handleClick = (e) => {
    const { dispatch, todo } = this.props
    dispatch(removeTodo(todo.id))
  }

  toggleEdit = (e) => {
    if (this.props.todo.completed) return
    this.setState({ edit: !this.state.edit })
  }

  handleChange = (e) => {
    this.setState({ task: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, todo } = this.props
    dispatch(updateTodo(todo.id, { task: this.state.task }))
    this.setState({ edit: false })
  }

  render () {
    const { todo } = this.props
    const { edit, task } = this.state
    let className = todo.completed ? 'completed' : ''
    if (!className && edit) className = 'editing'
    return (
      <li className={className}>
        <div className="view">
          <input onChange={this.handleCheck} className="toggle" type="checkbox" checked={todo.completed} />
          {!edit && <label onClick={this.toggleEdit}>{todo.task}</label>}
          <button onClick={this.handleClick} className="destroy"></button>
        </div>
        <form onSubmit={this.handleSubmit}>
          {edit && <input className="edit"
            onChange={this.handleChange}
            value={task} />
          }
        </form>
      </li>
    )
  }
}

export default connect()(Todo)
