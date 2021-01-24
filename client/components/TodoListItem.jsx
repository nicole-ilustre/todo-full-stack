import React from 'react'

function TodoListItem ({ todo }) {
  const handleToggle = (e) => {

  }

  const handleChange = (e) => {

  }

  return (
    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
      <div className='view'>
        <input className='toggle' type='checkbox'
          checked={todo.completed} onChange={handleToggle} />
        <label>{todo.title}</label>
        <button className='destroy'></button>
      </div>
      <input className='edit' onChange={handleChange}
        value='Create a TodoMVC template' />
    </li>
  )
}

export default TodoListItem
