exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { id: 1, name: 'Cook', urgency: 'medium urgency', completed: false },
        { id: 2, name: 'Clean', urgency: 'urgent', completed: false },
        { id: 3, name: 'Water Plants', urgency: 'not urgent', completed: true }

      ])
    })
}
