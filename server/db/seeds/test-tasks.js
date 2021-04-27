
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { id: 1, task: 'Grab coffee'},
        { id: 2, task: 'Go to the gym'},
        { id: 3, task: 'Attend lecture with JV'}
      ]);
    });
};
