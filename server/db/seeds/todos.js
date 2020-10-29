exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todos')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        { id: 1, task: 'Eat', completed: false },
        { id: 2, task: 'Code', completed: false },
        { id: 3, task: 'Sleep', completed: true }
      ])
    })
}
