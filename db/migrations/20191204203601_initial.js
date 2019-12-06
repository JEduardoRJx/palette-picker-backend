
exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('projects', (table) => {
      table.increments('id').primary();
      table.string('project_name').notNullable();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('palettes', (table) => {
      table.increments('id').primary();
      table.string('palette_name').notNullable();
      table.integer('project_id').unsigned();
      table.foreign('project_id').references('projects.id');
      table.string('color1').notNullable();
      table.string('color2').notNullable();
      table.string('color3').notNullable();
      table.string('color4').notNullable();
      table.string('color5').notNullable();
      
      table.timestamps(true, true);
    })
  ]);
};

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('projects'),
    knex.schema.dropTable('users')
  ]);
};