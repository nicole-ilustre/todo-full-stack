import React from 'react'
import { deleteTodo, updateTodo } from '../apis/apiClient'
export default function DisplayTodos (props) {
  function handleDelete (id) {
    deleteTodo(id)
    props.loadTodos()
  }
  function handleUpdate (id) {
    updateTodo(id)
    props.loadTodos()
  }
  return (
    <>
      {props.todos.map((todo, i) => <div key={i}><label htmlFor={todo.todo} key={i}></label><input onClick={() => { handleUpdate(todo.id) }}name={todo.todo} type="checkbox" key={i}></input><button onClick={() => handleDelete(todo.id)} className="delete">X</button>{todo.todo}</div>)}
    </>
  )
}