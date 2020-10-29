import React from 'react'
import { connect } from 'react-redux'
import { modifyTodo, removeTodo } from '../actions'

class Todo extends React.Component {
  state = {
    editing: false,
    updatedTask: ''
  }

  editInput = React.createRef()

  componentDidMount () {
    this.setState({ updatedTask: this.props.todo.task })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.editing !== this.state.editing && this.state.editing) {
      this.editInput.current.focus()
    }
  }

  setEditing = value => {
    this.setState({ editing: value })
  }

  handleTick = () => {
    const { todo } = this.props
    this.props.dispatch(modifyTodo(todo.id, { task: todo.task, completed: !todo.completed }))
  }

  handleDelete = () => {
    const { todo } = this.props
    this.props.dispatch(removeTodo(todo.id))
  }

  handleChange = e => {
    e.preventDefault()

    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.dispatch(modifyTodo(this.props.todo.id, { task: this.state.updatedTask }))

    this.setEditing(false)
  }

  render () {
    const { todo } = this.props

    return (
      <li
        className={[todo.completed ? 'completed' : '', this.state.editing ? 'editing' : ''].join(' ')}
        onBlur={() => this.setEditing(false)}
      >
        <div className="view">
          <input className="toggle" type="checkbox" checked={todo.completed} onChange={this.handleTick} />
          <label
            onDoubleClick={() => {
              this.setEditing(true)
            }}
          >
            {this.state.updatedTask}
          </label>
          <button className="destroy" onClick={this.handleDelete}></button>
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            className="edit"
            name="updatedTask"
            ref={this.editInput}
            value={this.state.updatedTask}
            onChange={this.handleChange}
          />
        </form>
      </li>
    )
  }
}

export default connect()(Todo)
