exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todos').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        { id: 1, task: 'make some hay' },
        { id: 2, task: 'bury some logs' },
        { id: 3, task: 'plant some corn' }
      ])
    })
}
