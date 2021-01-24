exports.seed = (knex) => {
  return knex('todos').del()
    .then(() => {
      return knex('todos').insert([
        { id: 1, title: 'do load of laundry', completed: true },
        { id: 2, title: 'be kind to a stranger', completed: true },
        { id: 3, title: 'meal plan for the week', completed: false }
      ])
    })
}
