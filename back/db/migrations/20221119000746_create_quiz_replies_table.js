/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("quiz_replies", function (table) {
    table.increments("id");
    table.string("name", 100).notNullable();
    table.string("email", 255).notNullable();
    table.string("phone", 10);
    table.string("file_name", 50);
    table.json("answers").notNullable();
    table
      .integer("quiz_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("quiz");
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("quiz_replies");
};
