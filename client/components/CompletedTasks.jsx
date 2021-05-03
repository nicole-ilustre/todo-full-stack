import React, { useEffect, useState } from 'react'
import { getCompletedTasksApi } from '../apis/apiClient'

export default function CompletedTasks () {
  const [completed, setCompleted] = useState({})

  useEffect(() => {
    getCompletedTasksApi()
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
