
exports.seed = function (knex) {
  return knex('todos').del()
    .then(function () {
      return knex('todos').insert([
        { id: 1, todo: 'cook dinner', completed: false },
        { id: 2, todo: 'clean house', completed: false },
        { id: 3, todo: 'study', completed: false }
      ])
    })
}
