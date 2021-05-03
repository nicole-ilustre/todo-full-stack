import React, { useEffect, useState } from 'react'
import { getCompletedTasks } from '../apis/apiClient'

export default function CompletedTasks () {
  const [completed, setCompleted] = useState({})

  useEffect(() => {
    getCompletedTasks()
      .then(tasks => {
        setCompleted(tasks)
        return null
      })
      .catch(err => console.error(err.message))
  }, [])
  return (
    <>
      {completed.map((task, i) => <li key={i}>{task}</li>)}
    </>
  )
}
