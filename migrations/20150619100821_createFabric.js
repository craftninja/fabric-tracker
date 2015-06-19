exports.up = function(knex, Promise) {
  return knex.schema.createTable('fabrics', function(table) {
    table.increments();
    table.string('name');
    table.string('content');
    table.integer('width_in_inches');
    table.float('yardage');
    table.boolean('domestic');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fabrics');
};
