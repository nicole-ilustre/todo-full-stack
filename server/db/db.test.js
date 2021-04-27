const knex = require('knex')
const config = require('./knexfile')
const env = 'test'
const testDb = knex(config[env])

const {
  addTask,
  getAllTasks,
  deleteTask
} = require('./db')

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

describe('getAllTasks', () => {

  test('function returns an array with a length of 3', () => {
    expect.assertions(1)
    return getAllTasks(testDb)
      .then(results => {
        expect(results).toHaveLength(3)
        return null
      })
  })

})

describe('addTask', () => {

  test('function returns an id of the new task', () => {
    const newTaskName = 'Changing Lightbulb'
    const newTaskUrgency = 'urgent'
    expect.assertions(1)
    return addTask(newTaskName, newTaskUrgency, testDb)
      .then(results => {
        expect(results).toEqual(expect.arrayContaining([4]))
        return null
      })
  })

})