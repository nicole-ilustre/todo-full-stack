import React from 'react'

function ToggleAllComplete (props) {
  return (
    <>
      <input id='toggle-all' className='toggle-all' type='checkbox' />
      <label htmlFor='toggle-all'>Mark all as complete</label>
    </>
  )
}

export default ToggleAllComplete
