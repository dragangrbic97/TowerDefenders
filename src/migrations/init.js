'use strict';
const c = require ( '../columns' )

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable("Defender", c.createDefenderColumns(Sequelize)),
            queryInterface.createTable("Tower", c.createTowerColumns(Sequelize)),
            queryInterface.createTable("Round", c.createRoundColumns(Sequelize))
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