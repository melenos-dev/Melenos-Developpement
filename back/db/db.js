const { Model } = require("objection");
const Knex = require("knex");

const knexfile = require("./knexfile");

const env = process.env.NODE_ENV || "development";
const configOptions = knexfile[env];

const knex = Knex({
  ...configOptions,
});

module.exports = Model.knex(knex);
