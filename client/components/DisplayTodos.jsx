import React from 'react'
import { connect } from 'react-redux'
import { deleteTodoApi, updateTodoApi } from '../apis/apiClient'
import { deleteTodo, updateTodo } from '../actions/index'

function DisplayTodos (props) {
  function handleDelete (id) {
    deleteTodoApi(id)
    props.dispatch(deleteTodo(id))
    props.loadTodos()
  }
  function handleUpdate (id) {
    updateTodoApi(id)
    props.dispatch(updateTodo(id))
    props.loadTodos()
  }
  return (
    <>
      {props.todos.map((todo, i) => <div key={i}><label htmlFor={todo.todo} key={i}></label><input onClick={() => { handleUpdate(todo.id) }}name={todo.todo} type="checkbox" key={i}></input><button onClick={() => handleDelete(todo.id)} className="delete">X</button>{todo.todo}</div>)}
    </>
  )
}

export default connect()(DisplayTodos)
