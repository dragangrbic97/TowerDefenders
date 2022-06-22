'use strict';
const defender = require ( '../columns/defender')
const tower = require ( '../columns/tower')
const round = require ('../columns/round')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable("defender", defender(Sequelize)),
      queryInterface.createTable("tower", tower(Sequelize)),
      queryInterface.createTable("round",  round(Sequelize))
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all ([
      queryInterface.dropTable("defender"),
      queryInterface.dropTable("tower"),
      queryInterface.dropTable("round")
    ])
  }
};
