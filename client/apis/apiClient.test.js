import nock from 'nock'

import { listTasks, addToTasks, deleteATask } from './apiClient'

const taskUrl = '/api/v1/'

describe('listTasks', () => {
  test('returns a list of tasks', () => {
    expect.assertions(2)

    const testData = [
      { id: 1, name: 'Cook', urgency: 'medium urgency', completed: false },
      { id: 2, name: 'Clean', urgency: 'urgent', completed: false },
      { id: 3, name: 'Water Plants', urgency: 'not urgent', completed: true }
    ]

    const scope = nock('http://localhost')
      .get(taskUrl)
      .reply(200, testData)

    return listTasks()
      .then(data => {
        expect(data).toEqual(testData)
        expect(scope.isDone()).toBe(true)
        return null
      })
  })
})

describe('addToTasks', () => {
  test('returns a status of 200', () => {
    expect.assertions(3)

    const scope = nock('http://localhost')
      .post(taskUrl)
      .reply(200)

    return addToTasks()
      .then(result => {
        expect(result).not.toBeUndefined()
        expect(result.status).toEqual(200)
        expect(scope.isDone()).toBe(true)
        return null
      })
  })
})

describe('deleteATask', () => {
  test('function was called', () => {
    expect.assertions(1)

    const testId = 1

    const scope = nock('http://localhost')
      .delete(taskUrl + testId)
      .reply(200)

    return deleteATask(testId)
      .then(() => {
        expect(scope.isDone()).toBe(true)
        return null
      })
  })
})
