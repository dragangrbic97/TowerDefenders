'use strict';
const defender = require ( '../columns/defender')
const tower = require ( '../columns/tower')
const round = require ('../columns/round')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable("Defender", defender(Sequelize)),
      queryInterface.createTable("Tower", tower(Sequelize)),
      queryInterface.createTable("Round",  round(Sequelize))
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all ([
      queryInterface.dropTable("Defender"),
      queryInterface.dropTable("Tower"),
      queryInterface.dropTable("Round")
    ])
  }
}
