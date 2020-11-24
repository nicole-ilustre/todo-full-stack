import nock from 'nock'
import { postTodo, getTodos } from './'

describe('postTodo', () => {
  const task = 'new todo'
  const createdTodo = {
    id: 1,
    task,
    priority: null,
    completed: false
  }
  const scope = nock('http://localhost')
    .post('/api/v1/todos', { task })
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

describe('getTodos', () => {
  const fakeTodos = [{ task: 'do thing' }, { task: 'do another thing' }]
  const scope = nock('http://localhost')
    .get('/api/v1/todos')
    .reply(200, fakeTodos)

  test('returns todos from api', () => {
    expect.assertions(2)
    return getTodos().then(todos => {
      expect(todos).toEqual(fakeTodos)
      expect(scope.isDone()).toBe(true)
      return null
    })
  })
})
