exports.up = function (knex) {
  return knex.schema.createTable('todos', t => {
    t.increments('id')
    t.string('task')
    t.integer('priority')
    t.boolean('completed').default(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('todos')
}
