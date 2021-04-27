exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { id: 1, task: 'Dishes', priority: 10, completed: false },
        { id: 2, task: 'Laundry', priority: 4, completed: true },
        { id: 3, task: 'Book Tickets', priority: 6, completed: false }
      ])
    })
}
