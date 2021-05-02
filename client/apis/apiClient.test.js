import nock from 'nock'

import { listTasks } from './apiClient'

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
