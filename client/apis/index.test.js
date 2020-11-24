import nock from 'nock'
import { postTodo } from './'

describe('postTodo', () => {
  const task = 'new todo'
  const createdTodo = {
    id: 1,
    task,
    priority: null,
    completed: false
  }
  const scope = nock('http://localhost')
    .post('/api/v1/todos', task)
    .reply(201, createdTodo)

  test('posts new todo to api', () => {
    expect.assertions(2)

    return postTodo(task)
      .then((newTodo) => {
        expect(newTodo).toEqual(createdTodo)
        expect(scope.isDone()).toBe(true)
        return null
      })
  })
})
